import { IResolvers } from '@graphql-tools/utils';
import { GraphQLError } from 'graphql';
import { prisma } from '../../config/prismaDB';
import { IContextApp } from '../../interfaces/user';
import encrypter from 'bcryptjs';
import { AES } from 'crypto-js';

const secret = process.env.SECRYPT || '';
export const seedResolver: IResolvers = {
  Query: {
    seedList: async (_, __, context) => {
      if (!context.user) return null;
      try {
        return null;
      } catch (error) {
        return null;
      }
    },
  },
  Mutation: {
    seedMake: async (_, __, context: IContextApp) => {
      // if (!context.user) return null;
      // if (context.user.role !== 'ADMIN') return null;
      try {
        const existsRootSeed = await prisma.seed.findFirst({
          where: { name: 'ROOTSEED' },
        });
        if (!existsRootSeed) return null;
        if (existsRootSeed.hasDone) return null;

        const roles = [
          {
            name: 'Asociado',
            slug: 'associate',
            menus: 'profile,products,resources,setting,offers,home',
          },
          {
            name: 'Administrador Cheil',
            slug: 'admin',
            menus: 'request,setting',
          },
          {
            name: 'Administrador Samsung',
            slug: 'admin',
            menus: 'user,irequest,product,setting,resources,transaction',
          },
          {
            name: 'Global',
            slug: 'global',
            menus:
              'user,irequest,product,setting,resources,transaction,request',
          },
        ];

        const newModule = await prisma.module.create({
          data: {
            name: 'Epp Members',
            slug: 'members'
          }
        });

        const salt = encrypter.genSaltSync();
        const encryptedPassword = encrypter.hashSync('123456'.trim(), salt);
        const newUser = await prisma.$transaction(async (tx) => {
          await tx.roles.createMany({
            data: roles,
          });

          const globalRole = await tx.roles.findFirst({
            where: { slug: 'global' },
          });

          if (!globalRole) return null;

          const user = await tx.users.create({
            data: {
              name: AES.encrypt('admin', secret).toString(),
              lastName: AES.encrypt('root', secret).toString(),
              email: 'samsung.digital.tech@gmail.com',
              password: encryptedPassword,
              image: '',
              role: 'ROOT',
              isActive: true,
              status: 'A',
              approval: 5,
              moduleId: newModule.id,
              phone: AES.encrypt('112121212', secret).toString(),
              dni: AES.encrypt('12121212', secret).toString(),
              country: 'Perú',
              address1: AES.encrypt('direccion', secret).toString(),
              address2: AES.encrypt('', secret).toString(),
              // productCategory: 'all',
              rolId: globalRole.id,
            },
          });

          await tx.userInfo.create({
            data: {
              userId: user.id,
            },
          });

          await tx.benefit.createMany({
            data: [
              {
                name: 'EcoCanje',
                createdBy: user.id,
              },
              {
                name: 'Cúpon SHOPAPP',
                createdBy: user.id,
              },
              {
                name: 'Tarjetas Seleccionadas',
                createdBy: user.id,
              },
              {
                name: 'Plan Canje galaxy',
                createdBy: user.id,
              },
              {
                name: 'Precio Promo',
                createdBy: user.id,
              },
            ],
          });

          await tx.seed.update({
            where: { id: existsRootSeed.id },
            data: {
              hasDone: true
            }
          });

          return true;
        });

        return newUser;
      } catch (error) {
        console.log(error);
        throw new GraphQLError('Error al eliminar beneficio');
      }
    },
  },
};
