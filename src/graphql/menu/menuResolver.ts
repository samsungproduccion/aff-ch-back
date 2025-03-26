import { IResolvers } from '@graphql-tools/utils';
import { GraphQLError } from 'graphql';
import { prisma } from '../../config/prismaDB';
import { IMenuCreate, IMenuEdit } from '../../interfaces/menu';

export const menuResolver: IResolvers = {
  Query: {
    menuGetAll: async (_, __, context) => {
      if (!context.user) return null;
      // console.log(context.user.role)
      if (context.user.role !== 'ADMIN' && context.user.role!== 'ROOT') return null;
      try {
        const menus = await prisma.menu.findMany({
          where: {
            isActive: true,
          },
          orderBy: {
            // order: 'asc',
            type: 'asc'
          },
        });
        // console.log(menus[menus.length - 1].roles);
        return menus;
      } catch (error) {
        console.log(error);
        throw new GraphQLError('Error al obtener menus');
      }
    },
    menuGetById: async (_, {id}:{id: number}, context) => {
      // console.log(context.user)
      if (!context.user) return null;
      // console.log(context.user.role)
      if (context.user.role !== 'ADMIN' && context.user.role!== 'ROOT') return null;
      try {
        const menu = await prisma.menu.findFirst({
          where: {
            id
          }
        });
        // console.log(menus[menus.length - 1].roles);
        return menu;
      } catch (error) {
        console.log(error);
        throw new GraphQLError('Error al obtener menus');
      }
    },
  },
  Mutation: {
    menuCreate: async (_, values: IMenuCreate, context) => {
      if (!context.user) return null;
      if (context.user.role !== 'ADMIN' && context.user.role!== 'ROOT') throw new GraphQLError('No tiene el rol necesario')
      // const today = new Date();
      // console.log(values);
      // return;
      try {

        const existsMenu = await prisma.menu.findFirst({
          where: {
            slug: values.slug
          }
        });
        if(existsMenu) throw new GraphQLError(`El menu '${values.slug}' ya existe`)

        const newMenu = await prisma.menu.create({
          data: {
            ...values,
            createdBy: context.user.id,
          },
        });
        // console.log(newMenu)
        return true;
      } catch (error) {
        console.log(error);
        throw new GraphQLError(error);
      }
    },
    menuEdit: async (_, values: IMenuEdit, context) => {
      if (!context.user) throw new GraphQLError('No hay usuario');
      if (context.user.role !== 'ADMIN' && context.user.role!== 'ROOT') throw new GraphQLError('No tiene el rol necesario')
      const today = new Date();
      const {id, ...updateValues} = values;
      // console.log(updateValues);
      // return;
      try {
        const existsMenu = await prisma.menu.findFirst({
          where: {
            id: id
          }
        });
        if(!existsMenu) throw new GraphQLError(`El menu '${values.slug}' no existe`)

        const newMenu = await prisma.menu.update({
          data: {
            ...updateValues,
            updatedAt: today,
            updatedBy: context.user.id
          },
          where: {
            id
          }
        });
        // console.log(newMenu)
        return true;
      } catch (error) {
        console.log(error);
        throw new GraphQLError('Error al editar menu');
      }
    },
    
  },
};
