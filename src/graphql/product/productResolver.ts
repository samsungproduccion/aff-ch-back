import { IResolvers } from '@graphql-tools/utils';
import { GraphQLError } from 'graphql';
import { prisma } from '../../config/prismaDB';
import { ICreateProduct, ICreateProductMany, IEditProduct } from '../../interfaces/product';
import { IContextApp } from '../../interfaces/user';

export const productResolver: IResolvers = {
  Query: {
    productGetAll: async (_, __, context: IContextApp) => {
      if (!context.user) return null;
      // console.log(context.user)
      try {
        if(context.user.role==='USER'){
          const products = await prisma.product.findMany({
            where: {
              isActive: true,
              moduleId: context.user.moduleId
            },
            orderBy: {
              createdAt: 'desc',
            },
            include: {
              benefits: {
                orderBy:{
                  name: 'asc'
                }
              },
              categories:{
                include:{
                  category: true,
                }
              }
            },
          });
          const modifiedProducts = products.map( product => ({
            ...product,
            categories: product.categories.map(joinCategories => joinCategories.category)
          }));
          // console.log(products[0].benefits);
          return modifiedProducts;

        }else{
          const products = await prisma.product.findMany({
            // where: {
            //   isActive: true,
            // },
            orderBy: {
              createdAt: 'desc',
            },
            include: {
              benefits: {
                orderBy:{
                  name: 'asc'
                }
              },
              categories:{
                include:{
                  category: true,
                }
              }
            },
          });
          const modifiedProducts = products.map( product => ({
            ...product,
            categories: product.categories.map(joinCategories => joinCategories.category)
          }));
          // console.log(products[0].benefits);
          return modifiedProducts;

        }

      } catch (error) {
        console.log(error)
        throw new GraphQLError('Error al obtener productos');
      }
    },
    productGet: async (_, { id }, context:IContextApp) => {
      if (!context.user) return null;
      try {
        const product = await prisma.product.findFirst({
          where: {
            id: parseInt(id),
          },
          include: {
            benefits: {
              orderBy:{
                name: 'asc'
              }
            },
            categories:{
              include:{
                category: true,
              }
            }
          },
        });
        // console.log(product.categories)
        const formedProduct = {
          ...product,
          categories: product.categories.map(cats => cats.category)
        }
        return formedProduct;
        
      } catch (error) {
        console.log(error)
        throw new GraphQLError('Error al obtener producto');
      }
    },
  },
  Mutation: {
    productChangeImage: async (_, { id, image }, context) => {
      // console.log(context.user);
      if (!context.user) return null;
      if (context.user.role!=='ADMIN') return null;
      try {
        const exists = await prisma.product.findFirst({
          where: {
            id: parseInt(id),
          },
        });
        if (!exists) return new GraphQLError('El producto no existe');

        await prisma.product.update({
          data: {
            image,
          },
          where: {
            id: exists.id,
          },
        });

        return true;
      } catch (error) {
        console.log(error);
        throw new GraphQLError('Error al cambiar imagen del producto');
      }
    },
    productCreate: async (_, values: ICreateProduct, context) => {
      // console.log(context.user);
      if (!context.user) return null;
      if (context.user.role!=='ADMIN') return null;
      try {
        const {
          sku = '',
          name = '',
          description = '',
          image = '',
          url_page = '',
          url_shop = '',
          price = 0,
          priceOld = 0,
          moduleId=0,
          benefits = [],
          categories = []
        } = values;
        // console.log( new Date(Date.now()).toLocaleString() );
        const today = new Date();

        const exists = await prisma.product.findFirst({
          where: {
            sku: sku,
            moduleId: moduleId
          },
        });
        if (exists)
          return new GraphQLError('El producto con sku ' + sku + ' ya está registrado.');
        // const benefitsArr = benefits.map((benefits) => {
        //   return {
        //     createdBy: context.user.id as number,
        //     benefit: {
        //       connect: {
        //         id: benefits,
        //       },
        //     },
        //   };
        // });
        const newProduct = await prisma.$transaction(async (tx) => {
          const categoriesToCreate = categories.map((idCategory) => ({
            createdBy: context.user.id,
            category: {
              connect: {
                id: idCategory,
              },
            },
          }));

          const product = await tx.product.create({
            data: {
              sku,
              name,
              description,
              image,
              url_page,
              url_shop,
              price,
              priceOld,
              moduleId: moduleId,
              createdBy: context.user.id,
              createdAt: today,
              categories: {
                create: categoriesToCreate,
              },
            },
          });

          const benefitsArr = benefits.map( benefit => ({
            ...benefit,
            productId: product.id,
            startDate: today,
            endDate: today,
          }))

          await tx.productBenefit.createMany({
            data: benefitsArr,
          });

          return true;
        });

        

        return newProduct;
      } catch (error) {
        console.log(error);
        throw new GraphQLError('Error al crear producto');
      }
    },
    productCreateMany: async (_, values: ICreateProductMany, context) => {
      // console.log(context.user);
      if (!context.user) return null;
      if (context.user.role!=='ADMIN') return null;
      return null
      try {
        const {
          products
        } = values;
        // console.log( new Date(Date.now()).toLocaleString() );
        const today = new Date();

        // const benefitsArr = benefits.map((benefits) => {
        //   return {
        //     createdBy: context.user.id as number,
        //     benefit: {
        //       connect: {
        //         id: benefits,
        //       },
        //     },
        //   };
        // });
        const newProducts = products.map( product => {
          return {
            ...product,
            createdBy: context.user.id,
            createdAt: today,
          }
        })

        const newProduct = await prisma.$transaction(async (tx) => {
          // const product = await tx.product.createMany({
          //   data: {
          //     ...products
          //   },
          // });

          // const benefitsArr = benefits.map( benefit => ({
          //   ...benefit,
          //   productId: product.id,
          //   startDate: today,
          //   endDate: today,
          // }))

          // await tx.product_Benefit.createMany({
          //   data: benefitsArr,
          // });

          return true;
        });

        

        return newProduct;
      } catch (error) {
        console.log(error);
        throw new GraphQLError('Error al crear producto');
      }
    },

    productEdit: async (_, values: IEditProduct, context) => {
      if (!context.user) return null;
      if (context.user.role!=='ADMIN') return null;

      try {
        const {
          id = 0,
          sku = '',
          isActive=true,
          name = '',
          image='',
          description = '',
          url_page = '',
          url_shop = '',
          price = 0,
          priceOld=0,
          benefits,
          categories = []
        } = values;
        // console.log( new Date(Date.now()).toLocaleString() );
        const exists = await prisma.product.findFirst({
          where: {
            // OR: [{ id: parseInt(id + '') }, { sku }],
            id: parseInt(id + '')
          },
        });
        if (!exists) return new GraphQLError('El producto no existe');

        const today = new Date();

        const editedProduct = await prisma.$transaction(async (tx) => {
          const categoriesToCreate = categories.map((idCategory) => ({
            createdBy: context.user.id,
            category: {
              connect: {
                id: idCategory,
              },
            },
          }));
          
          await tx.categoriesOnProducts.deleteMany({
            where: {
              productId: parseInt(id+'')
            }
          })

          await tx.product.update({
            data: {
              sku,
              name,
              description,
              url_page,
              url_shop,
              image,
              price,
              isActive,
              priceOld,
              updatedBy: context.user.id,
              updatedAt: new Date(),
              categories: {
                create: categoriesToCreate,
              },
            },
            where: {
              id: exists.id,
            },
          });

          await tx.productBenefit.deleteMany({
            where:{
              productId: exists.id,
            }
          })

          const benefitsArr = benefits.map( benefit => ({
            ...benefit,
            productId: exists.id,
            startDate: today,
            endDate: today,
          }));

          await tx.productBenefit.createMany({
            data: benefitsArr,
          });

          return true;
        });

        return editedProduct;
      } catch (error) {
        console.log(error);
        throw new GraphQLError('Error al editar producto');
      }
    },
    productDelete: async (_, {id}:{id:number}, context) => {
      if (!context.user) return null;
      if (context.user.role!=='ADMIN') return null;
      try {
        const exists = await prisma.product.findUnique({where:{id}});
        if (!exists) return new GraphQLError('El producto no existe');

        await prisma.product.delete({
          where:{
            id
          }
        });
        return true;
      } catch (error) {
        console.log(error);
        throw new GraphQLError('Error al eliminar producto');
      }
    },
  },
};
