import { IResolvers } from '@graphql-tools/utils';
import { GraphQLError } from 'graphql';
import { prisma } from '../../config/prismaDB';
import { IResourceCreate } from '../../interfaces/resources';
import { IContextApp } from '../../interfaces/user';

export const moduleResolver: IResolvers = {
  Query: {
    moduleGetAll: async (_, __, context) => {
      if (!context.user) return null;

      try {
        const resources = await prisma.module.findMany({
          where: {
            isActive: true,
          }
        });
        return resources;
      } catch (error) {
        return null;
      }
    },
  },
  Mutation: {
    moduleCreate: async (_, values: IResourceCreate, context) => {
      if (!context.user) return null;
      if (context.user.role!=='ADMIN') return null;
      const today = new Date();
      try {
  

        return false;
      } catch (error) {
        console.log(error);
        throw new GraphQLError('Error al crear usuario')
      }
    },
  },
};
