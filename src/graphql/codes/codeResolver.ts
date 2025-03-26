import { IResolvers } from '@graphql-tools/utils';
import { GraphQLError } from 'graphql';
import { prisma } from '../../config/prismaDB';

export const codeResolver: IResolvers = {
  Query: {
    codeGetAll: async (_, __, context) => {
      if (!context.user) return null;

      try {
        const codes = await prisma.code.findMany({
          where: {
            isActive: true,
          },
          orderBy: {
            createdAt: 'desc',
          }
        });
        // console.log(codes)
        return codes;
      } catch (error) {
        return null;
      }
    },
    codeGetAvailables: async (_, __, context) => {
      if (!context.user) return null;

      try {
        const products = await prisma.code.findMany({
          where: {
            isActive: true,
            available: true,
          },
        });
        return products;
      } catch (error) {
        return null;
      }
    },
  },
  Mutation: {
    codeCreate: async (_, { code }: { code: string }, context) => {
      // console.log(context.user);
      if (!context.user) return null;
      try {
        const exists = await prisma.code.findFirst({
          where: {
            code: code.trim(),
          },
        });
        if (!exists) return new GraphQLError('El producto no existe');

        await prisma.code.create({
          data: {
            code: code.trim(),
            createdBy: context.user.id,
          },
        });

        return true;
      } catch (error) {
        console.log(error);
        throw new GraphQLError('Error al crear codigo');
      }
    },
    codeCreateMany: async (_, { codes }: { codes: string[] }, context) => {
      // console.log(context.user);
      if (!context.user) return null;
      try {
        // console.log(codes)
        const codesWithUserId = codes.map((code) => ({
          code: code.trim(),
          createdBy: context.user.id,
        }));
        // console.log(codesWithUserId);
        await prisma.code.createMany({
          data: codesWithUserId,
        });
        return true;
      } catch (error) {
        console.log(error);
        throw new GraphQLError('Error al crear codigos');
      }
    },
  },
};
