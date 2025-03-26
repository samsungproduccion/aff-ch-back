import { IResolvers } from '@graphql-tools/utils';
import { GraphQLError } from 'graphql';
import { prisma } from '../../config/prismaDB';
import { ICreateCategory, ICreateEdit } from '../../interfaces/category.interface';
import { IContextApp } from '../../interfaces/user';

export const categoryResolver: IResolvers = {
  Query: {
    categoryGetAll: async (_, __, context) => {
      if (!context.user) return null;
      // if (context.user.role !== 'ADMIN' && context.user.role!== 'ROOT') return null;
      try {
        const products = await prisma.category.findMany({
          include:{
            products: {
              include:{
                product: {
                  include: {
                    benefits: {
                      orderBy:{
                        name: 'asc'
                      }
                    }
                  },
                }
              }
            }
          }
        });
        // console.log(products)
        const modifiedProducts = products.map( product => (
          {
            ...product,
            products: product.products.map(joinProduct => joinProduct.product)
          }
        ))
        // console.log(modifiedProducts[0].products)
        return modifiedProducts;
      } catch (error) {
        console.log(error);
        throw new GraphQLError('Error al obtener roles');
      }
    },
    categoryGetById: async (_, {id}:{id:number}, context) => {
      if (!context.user) return null;
      // if (context.user.role !== 'ADMIN' && context.user.role!== 'ROOT') return null;
      try {
        const category = await prisma.category.findUnique({
          where:{ 
            id
          },
          include:{
            products: {
              include:{
                product: {
                  include: {
                    benefits: {
                      orderBy:{
                        name: 'asc'
                      }
                    }
                  },
                }
              }
            }
          }
        });
        const formedCategory = {
          ...category,
          products: category.products.map(joinProduct => joinProduct.product)
        }
        // console.log(formedCategory)
        return formedCategory;
      } catch (error) {
        console.log(error);
        throw new GraphQLError('Error al obtener rol');
      }
    },
  },
  Mutation: {
    categoryCreate: async (_, values: ICreateCategory, context: IContextApp) => {
      if (!context.user) return null;
      if (context.user.role !== 'ADMIN' && context.user.role!== 'ROOT') return null;
      // const today = new Date();
      // console.log(values);
      // return;
      try {
        const newCategory = await prisma.category.create({
          data: {
            ...values,
            createdBy: context.user.id
          },
        });
        // console.log(newCategory)
        return true;
      } catch (error) {
        console.log(error);
        throw new GraphQLError('Error al crear categoria');
      }
    },
    categoryEdit: async (_, values: ICreateEdit, context: IContextApp) => {
      if (!context.user) return null;
      if (context.user.role !== 'ADMIN' && context.user.role!== 'ROOT') return null;
      // const today = new Date();
      // console.log(values);
      // return;
      const {id, ...updateValues} = values;
      try {
        const newCategory = await prisma.category.update({
          data: {
            ...updateValues,
          },
          where:{
            id
          }
        });
        // console.log(newCategory)
        return true;
      } catch (error) {
        console.log(error);
        throw new GraphQLError('Error al editar categoria');
      }
    },
    categoryAssigment: async (_, values: { categories: number[]; productId: number }, context: IContextApp) => {
      if (!context.user) return null;
      if (context.user.role !== 'ADMIN' && context.user.role!== 'ROOT') return null;
      // const today = new Date();
      // console.log(values);
      // return null;
      try {
        const categoriesToCreate = values.categories.map((idCategory) => ({
          createdBy: context.user.id,
          category: {
            connect: {
              id: idCategory,
            },
          },
        }));
        const menuEdition = await prisma.$transaction(async (tx) => {
          await tx.categoriesOnProducts.deleteMany({
            where: {
              productId: values.productId,
            },
          });

          await tx.product.update({
            data: {
              categories: {
                create: categoriesToCreate,
              },
            },
            where: {
              id: values.productId,
            },
          });

          // await tx.rolesOnMenus.updateMany({
          //   data: {
          //     createdBy: context.user.id,
          //   },
          //   where: {
          //     rolId: values.roleId,
          //     menuId: {
          //       in: values.menus,
          //     },
          //   },
          // });
          return true;
        });

        return menuEdition;
      } catch (error) {
        console.log(error);
        throw new GraphQLError('Error al asignar los productos/categorias');
      }
    },
  },
};
