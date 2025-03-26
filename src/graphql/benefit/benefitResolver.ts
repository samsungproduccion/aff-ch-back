import { IResolvers } from '@graphql-tools/utils';
import { GraphQLError } from 'graphql';
import { prisma } from '../../config/prismaDB';
import { IContextApp } from '../../interfaces/user';
import { IBenefitCreate } from '../../interfaces/benefit';

export const benefitResolver: IResolvers = {
  Query: {
    benefitGetAll: async (_, __, context) => {
      if (!context.user) return null;

      try {
        const resources = await prisma.benefit.findMany({
        });
        return resources;
      } catch (error) {
        return null;
      }
    },
    benefitGetActive: async (_, __, context) => {
      if (!context.user) return null;

      try {
        const resources = await prisma.benefit.findMany({
          where:{
            isActive: true
          }
        });
        return resources;
      } catch (error) {
        return null;
      }
    },
  },
  Mutation: {
    benefitCreate: async (_, {name}: {name:string}, context) => {
      // console.log(context.user);
      if (!context.user) return null;
      if (context.user.role!=='ADMIN') return null;
      try {
        await prisma.benefit.create({
          data: {
            name,
            isActive: true,
            createdBy: context.user.id
          },
        });
        return true;
      } catch (error) {
        console.log(error.message);
        throw new GraphQLError('Error al crear beneficio')
      }
    },
    benefitChangeStatus: async (_, {id, status}: {id:number, status:boolean}, context) => {
      // console.log(context.user);
      if (!context.user) return null;
      if (context.user.role!=='ADMIN') return null;
      try {
        await prisma.benefit.update({
          where:{
            id,
          },
          data: {
            isActive: status,
          },
        });
        return true;
      } catch (error) {
        console.log(error.message);
        throw new GraphQLError('Error al editar beneficio')
      }
    },
    benefitDelete: async (_, { id }: {id:number}, context:IContextApp) => {
      if (!context.user) return null;
      if (context.user.role!=='ADMIN') return null;
      try {
        await prisma.benefit.delete({
          where: {id},
        });
        return true;
      } catch (error) {
        console.log(error);
        throw new GraphQLError('Error al eliminar beneficio')
      }
    },
  },
};
