import { IResolvers } from '@graphql-tools/utils';
import { GraphQLError } from 'graphql';
import { prisma } from '../../config/prismaDB';
import { IMenuCreate } from '../../interfaces/menu';

export const rolesResolver: IResolvers = {
  Query: {
    rolGetAll: async (_, __, context) => {
      if (!context.user) return null;
      if (context.user.role !== 'ADMIN' && context.user.role!== 'ROOT') return null;
      try {
        const roles = await prisma.roles.findMany({
          include:{
            menu: {
              include:{
                menu: true
              }
            }
          }
        });

        const modifiedRoles = roles.map( rol => (
          {
            ...rol,
            menus: rol.menu.map(rolMenu => rolMenu.menu)
          }
        ))

        return modifiedRoles;
      } catch (error) {
        console.log(error);
        throw new GraphQLError('Error al obtener roles');
      }
    },
    rolGetById: async (_, {id}:{id:number}, context) => {
      if (!context.user) return null;
      if (context.user.role !== 'ADMIN' && context.user.role!== 'ROOT') return null;
      try {
        const rol = await prisma.roles.findUnique({
          where:{ 
            id
          },
          include:{
            menu: {
              include:{
                menu: true
              }
            }
          }
        });
        const role = {
          ...rol,
          menus: rol.menu.map(rolMenu => rolMenu.menu)
        }
        // console.log(role)
        return role;
      } catch (error) {
        console.log(error);
        throw new GraphQLError('Error al obtener rol');
      }
    },
  },
  Mutation: {
    rolCreate: async (_, values: IMenuCreate, context) => {
      if (!context.user) return null;
      if (context.user.role !== 'ADMIN' && context.user.role!== 'ROOT') return null;
      // const today = new Date();
      // console.log(values);
      // return;
      try {
        const newMenu = await prisma.menu.create({
          data: {
            ...values,
          },
        });

        return true;
      } catch (error) {
        console.log(error);
        throw new GraphQLError('Error al crear rol');
      }
    },
    rolMenuAssigment: async (_, values: { menus: number[]; roleId: number }, context) => {
      if (!context.user) return null;
      if (context.user.role !== 'ADMIN' && context.user.role!== 'ROOT') return null;
      // const today = new Date();
      // console.log(values);
      // return null;
      const menusToCreate = values.menus.map((idMenu) => ({
        menu: {
          connect: {
            id: idMenu,
          },
        },
      }));
      try {
        const menuEdition = await prisma.$transaction(async (tx) => {
          await tx.rolesOnMenus.deleteMany({
            where: {
              rolId: values.roleId,
            },
          });

          await tx.roles.update({
            data: {
              menu: {
                create: menusToCreate,
              },
            },
            where: {
              id: values.roleId,
            },
          });

          await tx.rolesOnMenus.updateMany({
            data: {
              createdBy: context.user.id,
            },
            where: {
              rolId: values.roleId,
              menuId: {
                in: values.menus,
              },
            },
          });

          return true;
        });

        return menuEdition;
      } catch (error) {
        console.log(error);
        throw new GraphQLError('Error al asignar los menus');
      }
    },
  },
};
