import { IResolvers } from '@graphql-tools/utils';
import { GraphQLError } from 'graphql';
import { prisma } from '../../config/prismaDB';
import { IResourceCreate } from '../../interfaces/resources';
import { IContextApp } from '../../interfaces/user';

export const resourceResolver: IResolvers = {
  Query: {
    resourcesGetAll: async (_, __, context) => {
      if (!context.user) return null;

      try {
        const resources = await prisma.resources.findMany({
          where: {
            isActive: true,
          },
          orderBy:{
            createdAt: 'desc'
          }
        });
        return resources;
      } catch (error) {
        return null;
      }
    },
    resourcesGet: async (_, { id }, context) => {
      if (!context.user) return null;

      const resources = await prisma.resources.findFirst({
        where: {
          id: parseInt(id),
        },
      });
      return resources;
    },
  },
  Mutation: {
    resourcesCreate: async (_, values: IResourceCreate, context) => {
      if (!context.user) return null;
      if (context.user.role!=='ADMIN') return null;
      const today = new Date();
      try {
        await prisma.resources.create({
          data: {
            ...values,
            createdAt: today,
          },
        });

        return true;
      } catch (error) {
        console.log(error);
        throw new GraphQLError('Error al crear usuario')
      }
    },
    resourcesDelete: async (_, { id }: {id:number}, context:IContextApp) => {
      if (!context.user) return null;
      if (context.user.role!=='ADMIN') return null;
      await prisma.resources.delete({
        where: {id},
      });
      return true;
    },
  },
};
