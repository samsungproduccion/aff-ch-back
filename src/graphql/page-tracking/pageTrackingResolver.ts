import { IResolvers } from '@graphql-tools/utils';
import { GraphQLError } from 'graphql';
import { prisma } from '../../config/prismaDB';
import { IResourceCreate } from '../../interfaces/resources';
import { IContextApp, IContextUser } from '../../interfaces/user';
import { IPageTrackingCreate, IUtmProperties } from '../../interfaces/page-tracking.interface';
import { AES, enc } from 'crypto-js';

const secret = process.env.SECRYPT || '';

export const pageTrackingResolver: IResolvers = {
  Query: {
    pageTrackingGetAll: async (_, __, context) => {
      if (!context.user) return null;

      try {
        const pageTracking = await prisma.pageTracking.findMany({
        });
        return pageTracking;
      } catch (error) {
        console.log(error)
        return null;
      }
    },
    pageTrackingGet: async (_, { id }, context) => {
      if (!context.user) return null;
      
      const pageTrackings = await prisma.pageTracking.findFirst({
        where: {
          id: parseInt(id),
        },
      });
      return pageTrackings;
    },
    pageTrackingAndUserGetAll: async (_, __, context) => {
      if (!context.user) return null;

      try {
        const pageTracking = await prisma.pageTracking.findMany({
          include: {
            Users: true
          }
        });
        // console.log(pageTracking)
        const unencrypted = pageTracking.map((item) => {
          let unencryptedUser: IContextUser = null;

          if(item.Users){
            unencryptedUser = {
              ...item.Users,
              name: AES.decrypt(item.Users.name, secret).toString(enc.Utf8),
              lastName: AES.decrypt(item.Users.lastName, secret).toString(enc.Utf8),
              phone: AES.decrypt(item.Users.phone, secret).toString(enc.Utf8),
              dni: AES.decrypt(item.Users.dni, secret).toString(enc.Utf8),
              address1: AES.decrypt(item.Users.address1, secret).toString(enc.Utf8),
              address2: AES.decrypt(item.Users.address2, secret).toString(enc.Utf8),
            }
          }
          const utm: IUtmProperties = JSON.parse(item.parameters);
          // console.log(utm)

          return {
            ...item,
            utm_source: utm.utm_source || '',
            utm_medium: utm.utm_medium || '',
            utm_content: utm.utm_content || '',
            Users: unencryptedUser
          }
        });
        // console.log(unencrypted)
        return unencrypted;
      } catch (error) {
        console.log(error)
        return null;
      }
    },
    pageTrackingAndUserGet: async (_, {id}:{id:string}, context) => {
      if (!context.user) return null;

      try {
        const pageTracking = await prisma.pageTracking.findFirst({
          where: {
            id: parseInt(id),
          },
          include: {
            Users: true
          }
        });
        if(!pageTracking) return new GraphQLError('Registro no encontrado');
        let unencryptedUser: IContextUser = null;
        if(pageTracking.Users){
          unencryptedUser = {
            ...pageTracking.Users,
            name: AES.decrypt(pageTracking.Users.name, secret).toString(enc.Utf8),
            lastName: AES.decrypt(pageTracking.Users.lastName, secret).toString(enc.Utf8),
            phone: AES.decrypt(pageTracking.Users.phone, secret).toString(enc.Utf8),
            dni: AES.decrypt(pageTracking.Users.dni, secret).toString(enc.Utf8),
            address1: AES.decrypt(pageTracking.Users.address1, secret).toString(enc.Utf8),
            address2: AES.decrypt(pageTracking.Users.address2, secret).toString(enc.Utf8),
          }
        }
        const utm: IUtmProperties = JSON.parse(pageTracking.parameters);

        const unencrypted = {
          ...pageTracking,
          utm_source: utm.utm_source || '',
          utm_medium: utm.utm_medium || '',
          utm_content: utm.utm_content || '',
          Users: unencryptedUser
        }
        // console.log(unencrypted)
        return unencrypted;
      } catch (error) {
        console.log(error)
        return null;
      }
    },
  },
  Mutation: {
    pageTrackingCreate: async (_, values: IPageTrackingCreate, context) => {
      // if (!context.user) return null;
      // if (context.user.role!=='ADMIN') return null;

      try {
        await prisma.pageTracking.create({
          data: {
            ...values,
          },
        });

        return true;
      } catch (error) {
        console.log(error);
        throw new GraphQLError('Error al crear registro')
      }
    },
  },
};
