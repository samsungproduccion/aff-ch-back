import { IResolvers } from '@graphql-tools/utils';
import { GraphQLError } from 'graphql';
import { prisma } from '../../config/prismaDB';
import encrypter from 'bcryptjs';
import { IContextApp, ICreateSuperUser, ICreateUser, ICreateUserApproved, IEditUser, IRegisterUser } from '../../interfaces/user';
import { AES, enc } from 'crypto-js';
import { sendEmail } from '../../helpers/sendEmail';
import { approveUserTemplate } from '../../utils/mails/aprovedUser';
import { registerSuccess } from '../../utils/mails/registerSuccess';
import { registerComplete } from '../../utils/mails/registerComplete';
import { InputChangeUserDoc, InputChangeUserStatus, InputObserveUser, InputPreApprove } from './user-inputs';
import { observedUser } from '../../utils/mails/observedUser';
import { userRegistration } from '../../utils/mails/userRegistration';

const secret = process.env.SECRYPT || '';

export const UserResolver: IResolvers = {
  Query: {
    userGetAll: async (_, __, context: IContextApp) => {
      if (!context.user) return null;

      try {
        const users = await prisma.users.findMany({
          include: {
            userInfo: true,
            representative: true
          },
          where:{
            role: 'USER',
            // moduleId: context.user.moduleId
          }
        });
        const nonEncryptedUsers = users.map(user => {
          let newRepresentative=null;
          if(user.representative){
            newRepresentative = {
              ...user.representative,
              name: AES.decrypt(user.representative.name, secret).toString(enc.Utf8),
              lastName: AES.decrypt(user.representative.lastName, secret).toString(enc.Utf8),
              email: AES.decrypt(user.representative.email, secret).toString(enc.Utf8),
              phone: AES.decrypt(user.representative.phone, secret).toString(enc.Utf8),
              dni: AES.decrypt(user.representative.dni, secret).toString(enc.Utf8),
              rucNumber: AES.decrypt(user.representative.rucNumber, secret).toString(enc.Utf8),
              bankNumber: AES.decrypt(user.representative.bankNumber, secret).toString(enc.Utf8),
            }
          }
          return {
            ...user,
            name: AES.decrypt(user.name, secret).toString(enc.Utf8),
            lastName: AES.decrypt(user.lastName, secret).toString(enc.Utf8),
            phone: AES.decrypt(user.phone, secret).toString(enc.Utf8),
            dni: AES.decrypt(user.dni, secret).toString(enc.Utf8),
            address1: AES.decrypt(user.address1, secret).toString(enc.Utf8),
            address2: AES.decrypt(user.address2, secret).toString(enc.Utf8),
            userInfo: {
              ...user.userInfo,
              rucNumber: AES.decrypt(user.userInfo.rucNumber, secret).toString(enc.Utf8),
              bankNumber: AES.decrypt(user.userInfo.bankNumber, secret).toString(enc.Utf8),
            },
            representative: newRepresentative
          }
        })
        // console.log(nonEncryptedUsers)
        return nonEncryptedUsers;
      } catch (error) {
        console.log(error)
        return null;
      }
    },
    userGetSelected: async (_, {quantity}: {quantity: number}, context) => {
      if (!context.user) return null;

      try {
        const users = await prisma.users.findMany({
          include: {
            userInfo: true,
            representative: true,
          },
          where:{
            role: 'USER',
            // moduleId: context.user.moduleId
          },
          take: quantity,
          orderBy:{
            createdAt: 'desc'
          }
        });
        const nonEncryptedUsers = users.map(user => {
          let newRepresentative=null;
          if(user.representative){
            newRepresentative = {
              ...user.representative,
              name: AES.decrypt(user.representative.name, secret).toString(enc.Utf8),
              lastName: AES.decrypt(user.representative.lastName, secret).toString(enc.Utf8),
              email: AES.decrypt(user.representative.email, secret).toString(enc.Utf8),
              phone: AES.decrypt(user.representative.phone, secret).toString(enc.Utf8),
              dni: AES.decrypt(user.representative.dni, secret).toString(enc.Utf8),
              rucNumber: AES.decrypt(user.representative.rucNumber, secret).toString(enc.Utf8),
              bankNumber: AES.decrypt(user.representative.bankNumber, secret).toString(enc.Utf8),
            }
          }
          return {
            ...user,
            name: AES.decrypt(user.name, secret).toString(enc.Utf8),
            lastName: AES.decrypt(user.lastName, secret).toString(enc.Utf8),
            phone: AES.decrypt(user.phone, secret).toString(enc.Utf8),
            dni: AES.decrypt(user.dni, secret).toString(enc.Utf8),
            address1: AES.decrypt(user.address1, secret).toString(enc.Utf8),
            address2: AES.decrypt(user.address2, secret).toString(enc.Utf8),
            userInfo: {
              ...user.userInfo,
              rucNumber: AES.decrypt(user.userInfo.rucNumber, secret).toString(enc.Utf8),
              bankNumber: AES.decrypt(user.userInfo.bankNumber, secret).toString(enc.Utf8),
            },
            representative: newRepresentative,
          }
        })
        return nonEncryptedUsers;
      } catch (error) {
        return null;
      }
    },
    userGetAllCategories: async (_, __, context) => {
      if (!context.user) return null;

      try {
        const users = await prisma.users.findMany({
          include: {
            userInfo: true,
            representative: true,
          },
          // where: {
          //   moduleId: context.user.moduleId
          // }
        });
        const nonEncryptedUsers = users.map(user => {
          let newRepresentative=null;
          if(user.representative){
            newRepresentative = {
              ...user.representative,
              name: AES.decrypt(user.representative.name, secret).toString(enc.Utf8),
              lastName: AES.decrypt(user.representative.lastName, secret).toString(enc.Utf8),
              email: AES.decrypt(user.representative.email, secret).toString(enc.Utf8),
              phone: AES.decrypt(user.representative.phone, secret).toString(enc.Utf8),
              dni: AES.decrypt(user.representative.dni, secret).toString(enc.Utf8),
              rucNumber: AES.decrypt(user.representative.rucNumber, secret).toString(enc.Utf8),
              bankNumber: AES.decrypt(user.representative.bankNumber, secret).toString(enc.Utf8),
            }
          }
          return {
            ...user,
            name: AES.decrypt(user.name, secret).toString(enc.Utf8),
            lastName: AES.decrypt(user.lastName, secret).toString(enc.Utf8),
            phone: AES.decrypt(user.phone, secret).toString(enc.Utf8),
            dni: AES.decrypt(user.dni, secret).toString(enc.Utf8),
            address1: AES.decrypt(user.address1, secret).toString(enc.Utf8),
            address2: AES.decrypt(user.address2, secret).toString(enc.Utf8),
            userInfo: {
              ...user.userInfo,
              rucNumber: AES.decrypt(user.userInfo.rucNumber, secret).toString(enc.Utf8),
              bankNumber: AES.decrypt(user.userInfo.bankNumber, secret).toString(enc.Utf8),
            },
            representative: newRepresentative,
          }
        })
        return nonEncryptedUsers;
      } catch (error) {
        return null;
      }
    },
    userGetAllAdmin: async (_, __, context) => {
      if (!context.user || context.user.role!=='ROOT') return null;
      try {
        const users = await prisma.users.findMany({
          include: {
            userInfo: true,
            representative: true,
          },
          where:{
            role: 'ADMIN',
          }
        });
        const nonEncryptedUsers = users.map(user => {
          let newRepresentative=null;
          if(user.representative){
            newRepresentative = {
              ...user.representative,
              name: AES.decrypt(user.representative.name, secret).toString(enc.Utf8),
              lastName: AES.decrypt(user.representative.lastName, secret).toString(enc.Utf8),
              email: AES.decrypt(user.representative.email, secret).toString(enc.Utf8),
              phone: AES.decrypt(user.representative.phone, secret).toString(enc.Utf8),
              dni: AES.decrypt(user.representative.dni, secret).toString(enc.Utf8),
              rucNumber: AES.decrypt(user.representative.rucNumber, secret).toString(enc.Utf8),
              bankNumber: AES.decrypt(user.representative.bankNumber, secret).toString(enc.Utf8),
            }
          }
          return {
            ...user,
            name: AES.decrypt(user.name, secret).toString(enc.Utf8),
            lastName: AES.decrypt(user.lastName, secret).toString(enc.Utf8),
            phone: AES.decrypt(user.phone, secret).toString(enc.Utf8),
            dni: AES.decrypt(user.dni, secret).toString(enc.Utf8),
            address1: AES.decrypt(user.address1, secret).toString(enc.Utf8),
            address2: AES.decrypt(user.address2, secret).toString(enc.Utf8),
            userInfo: {
              ...user.userInfo,
              rucNumber: AES.decrypt(user.userInfo.rucNumber, secret).toString(enc.Utf8),
              bankNumber: AES.decrypt(user.userInfo.bankNumber, secret).toString(enc.Utf8),
            },
            representative: newRepresentative,
          }
        })
        return nonEncryptedUsers;
      } catch (error) {
        return null;
      }
    },
    userGetAllByStatus: async (_, {approval}:{approval:[number]}, context) => {
      // if (!context.user) return null;
      // let users=null;
      try {
        const rol = await prisma.roles.findFirst({
          where:{ slug: 'associate' }
        });
        if(!rol) return new GraphQLError('El rol no esta definido');

        const users = await prisma.users.findMany({
          include: {
            userInfo: true,
            representative: true,
            module: true
          },
          where:{
            role: 'USER',
            approval: {
              in: approval
            },
            // moduleId: context.user.moduleId
          },
          orderBy:{
            approval: 'desc',
          }
        });

        // if (approval===0) {
        //   users = await prisma.users.findMany({
        //     include: {
        //       userInfo: true,
        //     },
        //     where:{
        //       rolId: rol.id,
        //       approval: {notIn:[5]},
        //     },
        //     orderBy:{
        //       approval: 'desc',
        //     }
        //   });
        // }else{
        //   users = await prisma.users.findMany({
        //     include: {
        //       userInfo: true,
        //     },
        //     where:{
        //       approval: approval,
        //       rolId: rol.id,
        //     }
        //   });
        // }
        const nonEncryptedUsers = users.map(user => {
          let newRepresentative=null;
          if(user.representative){
            newRepresentative = {
              ...user.representative,
              name: AES.decrypt(user.representative.name, secret).toString(enc.Utf8),
              lastName: AES.decrypt(user.representative.lastName, secret).toString(enc.Utf8),
              email: AES.decrypt(user.representative.email, secret).toString(enc.Utf8),
              phone: AES.decrypt(user.representative.phone, secret).toString(enc.Utf8),
              dni: AES.decrypt(user.representative.dni, secret).toString(enc.Utf8),
              rucNumber: AES.decrypt(user.representative.rucNumber, secret).toString(enc.Utf8),
              bankNumber: AES.decrypt(user.representative.bankNumber, secret).toString(enc.Utf8),
            }
          }
          return {
            ...user,
            name: AES.decrypt(user.name, secret).toString(enc.Utf8),
            lastName: AES.decrypt(user.lastName, secret).toString(enc.Utf8),
            phone: AES.decrypt(user.phone, secret).toString(enc.Utf8),
            dni: AES.decrypt(user.dni, secret).toString(enc.Utf8),
            address1: AES.decrypt(user.address1, secret).toString(enc.Utf8),
            address2: AES.decrypt(user.address2, secret).toString(enc.Utf8),
            userInfo: {
              ...user.userInfo,
              rucNumber: AES.decrypt(user.userInfo.rucNumber, secret).toString(enc.Utf8),
              bankNumber: AES.decrypt(user.userInfo.bankNumber, secret).toString(enc.Utf8),
            },
            representative: newRepresentative,
          }
        })
        return nonEncryptedUsers;
      } catch (error) {
        console.log(error)
        return null;
      }
    },
    userGet: async (_, __, context: IContextApp) => {
      // console.log(context.user)
      if (!context.user) return null;
      // console.log(context.user)
      // console.log(context.user)
      try {
        const user= await prisma.users.findUnique({
          where:{
            id: context.user.id
          },
          include:{
            userInfo: true,
            roles: true,
            representative: true,
            module: true,
          }
        });
        // console.log(user)
        const rol = await prisma.roles.findUnique({
          where:{ 
            id: user.rolId
          },
          include:{
            menu: {
              include:{
                menu: true,
              }
            }
          }
        });
        // console.log({rol})
        const role = {
          ...rol,
          menus: rol.menu.map(rolMenu => rolMenu.menu)
        }
        // console.log(role)
        // console.log({user})
        // const userMenus = user.roles.menus.split(",")
        // console.log({userMenus})
        let newRepresentative=null;
          if(user.representative){
            newRepresentative = {
              ...user.representative,
              name: AES.decrypt(user.representative.name, secret).toString(enc.Utf8),
              lastName: AES.decrypt(user.representative.lastName, secret).toString(enc.Utf8),
              email: AES.decrypt(user.representative.email, secret).toString(enc.Utf8),
              phone: AES.decrypt(user.representative.phone, secret).toString(enc.Utf8),
              dni: AES.decrypt(user.representative.dni, secret).toString(enc.Utf8),
              rucNumber: AES.decrypt(user.representative.rucNumber, secret).toString(enc.Utf8),
              bankNumber: AES.decrypt(user.representative.bankNumber, secret).toString(enc.Utf8),
            }
          }
          
        const nonEncryptedUser = {
          ...user,
          name: AES.decrypt(user.name, secret).toString(enc.Utf8),
          lastName: AES.decrypt(user.lastName, secret).toString(enc.Utf8),
          phone: AES.decrypt(user.phone, secret).toString(enc.Utf8),
          dni: AES.decrypt(user.dni, secret).toString(enc.Utf8),
          address1: AES.decrypt(user.address1, secret).toString(enc.Utf8),
          address2: AES.decrypt(user.address2, secret).toString(enc.Utf8),
          userInfo: {
            ...user.userInfo,
            rucNumber: AES.decrypt(user.userInfo.rucNumber, secret).toString(enc.Utf8),
            bankNumber: AES.decrypt(user.userInfo.bankNumber, secret).toString(enc.Utf8),
          },
          representative: newRepresentative,
          menus: role.menus
        };
        // console.log(nonEncryptedUser)
        // if(nonEncryptedUser.roles.slug==='associate' && nonEncryptedUser.module.name=='Epp Members'){
        //   nonEncryptedUser.menus = ['profile','products','setting','offers']
        // }
        // nonEncryptedUser.menus=role;
        // console.log(nonEncryptedUser);
        return nonEncryptedUser;
        
      } catch (error) {
        console.log(error)
        return null;
      }
    },
    userGetById: async(_, {id}, context:IContextApp) => {
      // if (!context.user) return null;
      try {
        const user = await prisma.users.findUnique({
          include: {
            userInfo: true,
            representative: true,
          },
          where:{
            id: parseInt(id),
          }
        });

        let newRepresentative=null;
        if(user.representative){
          newRepresentative = {
            ...user.representative,
            name: AES.decrypt(user.representative.name, secret).toString(enc.Utf8),
            lastName: AES.decrypt(user.representative.lastName, secret).toString(enc.Utf8),
            email: AES.decrypt(user.representative.email, secret).toString(enc.Utf8),
            phone: AES.decrypt(user.representative.phone, secret).toString(enc.Utf8),
            dni: AES.decrypt(user.representative.dni, secret).toString(enc.Utf8),
            rucNumber: AES.decrypt(user.representative.rucNumber, secret).toString(enc.Utf8),
            bankNumber: AES.decrypt(user.representative.bankNumber, secret).toString(enc.Utf8),
          }
        }

        const nonEncryptedUser = {
          ...user,
          name: AES.decrypt(user.name, secret).toString(enc.Utf8),
          lastName: AES.decrypt(user.lastName, secret).toString(enc.Utf8),
          phone: AES.decrypt(user.phone, secret).toString(enc.Utf8),
          dni: AES.decrypt(user.dni, secret).toString(enc.Utf8),
          address1: AES.decrypt(user.address1, secret).toString(enc.Utf8),
          address2: AES.decrypt(user.address2, secret).toString(enc.Utf8),
          userInfo: {
            ...user.userInfo,
            rucNumber: AES.decrypt(user.userInfo.rucNumber, secret).toString(enc.Utf8),
            bankNumber: AES.decrypt(user.userInfo.bankNumber, secret).toString(enc.Utf8),
          },
          representative: newRepresentative,
        };
        // console.log(nonEncryptedUser)
        return nonEncryptedUser;
      } catch (error) {
        console.log(error)
        return null;
      }
    },
    userGetMenus: async(_, __, context: IContextApp) => {
      if (!context.user) return null;
      try {
        const menus = [];
        // const menus = context.user.roles.menus.split(",") || null;
        // console.log(menus);
        return menus || null;
      } catch (error) {
        console.log(error)
        return null;
      }
    },
    userGetRoles: async(_, __, context: IContextApp) => {
      if (!context.user || context.user.role!=='ROOT') return null;
      try {
        const roles = await prisma.roles.findMany({
          where:{
            slug:{
              not: 'associate'
            }
          }
        });
        // console.log(menus);
        return roles;
      } catch (error) {
        console.log(error)
        return null;
      }
    },
  },
  Mutation: {
    userCreate: async (_, values: ICreateUser) => {
      try {
        const {
          name,
          lastName,
          email,
          password,
          image = '',
          phone,
          dni,
          country='',
          address1,
          address2 = '',
          checkTerms = false,
          checkPrivacy = false,
        } = values;
        // console.log( new Date(Date.now()).toLocaleString() );
        const exists = await prisma.users.findFirst({
          where: {
            email: email,
          },
        });
        if (exists) return new GraphQLError('El email ' + email + ' ya está registrado');
        const existsRole = await prisma.roles.findFirst({
          where: {slug: 'associate', name: 'Asociado Deals'}
        });
        if (!existsRole) return new GraphQLError('Rol no especificado');

        const existModule = await prisma.module.findFirst({
          where:{
            name: 'Deals'
          }
        });
        if(!existModule) return new GraphQLError('No hay modulo para registro');

        const salt = encrypter.genSaltSync();
        const encryptedPassword = encrypter.hashSync(password.trim(), salt);
        const newUser = await prisma.$transaction(async (tx) => {
          const user = await tx.users.create({
            data: {
              name: AES.encrypt(name, secret).toString(),
              lastName: AES.encrypt(lastName, secret).toString(),
              email: email,
              password: encryptedPassword,
              image: image,
              role: 'USER',
              isActive: true,
              status: 'P',
              approval: 1,
              phone: AES.encrypt(phone, secret).toString(),
              dni: AES.encrypt(dni, secret).toString(),
              country,
              moduleId: existModule.id,
              address1: AES.encrypt(address1, secret).toString(),
              address2: AES.encrypt(address2, secret).toString(),
              // productCategory: 'all',
              rolId: existsRole.id
            },
          });

          await tx.userInfo.create({
            data: {
              userId: user.id,
              bankNumber:AES.encrypt('', secret).toString(),
              rucNumber: AES.encrypt('', secret).toString(),
              checkTerms,
              checkPrivacy,
            },
          });

          return user;
        });
        const template = registerSuccess({
          // name: AES.decrypt(newUser.name, secret).toString(enc.Utf8),
          url: process.env.FRONT_URL + '/auth/login/',
        });
        sendEmail({
          emailTitle: 'Samsung afiliados',
          emailSubject: '¡Se creo tu cuenta️! ✔ Ahora, completa tu documentación🚨',
          emailReciever: email.trim(),
          template: template,
        });

        const eluser = await prisma.users.findFirst({
          where: {
            id: newUser.id,
          },
          include: {
            userInfo: true,
          },
        });
        // console.log(eluser);
        return newUser;
      } catch (error) {
        console.log(error);
        throw new GraphQLError('Error al crear usuario');
      }
    },
    userCreateSuper: async (_, values: ICreateSuperUser, context) => {
      if (!context.user || context.user.role!=='ROOT') return null;
      try {
        // console.log(values)
        const {
          name,
          lastName,
          email,
          phone,
          dni,
          rolId,
          moduleId
        } = values;
        // console.log( new Date(Date.now()).toLocaleString() );
        const exists = await prisma.users.findFirst({
          where: {
            email: email,
          },
        });
        if (exists) return new GraphQLError('El email ' + email + ' ya está registrado');
        const salt = encrypter.genSaltSync();
        const encryptedPassword = encrypter.hashSync(dni.trim(), salt);
        // console.log({moduleId})
        const existModule = await prisma.module.findUnique({
          where:{
            id: moduleId
          }
        });
        if(!existModule) return new GraphQLError('No hay modulo para registro');

        const existsRole = await prisma.roles.findUnique({
          where: {
            id: rolId
          }
        });
        if (!existsRole) return new GraphQLError('No existe el rol');

        const roleName = existsRole.slug==='global' ? 'ROOT' : 'ADMIN';

        const newUser = await prisma.$transaction(async (tx) => {
          const user = await tx.users.create({
            data: {
              name: AES.encrypt(name, secret).toString(),
              lastName: AES.encrypt(lastName, secret).toString(),
              email: email,
              password: encryptedPassword,
              role: roleName,
              isActive: true,
              status: 'A',
              approval: 5,
              moduleId: existModule.id,
              phone: AES.encrypt(phone, secret).toString(),
              dni: AES.encrypt(dni, secret).toString(),
              country: 'Perú',
              address1: AES.encrypt('Dirección', secret).toString(),
              address2: AES.encrypt('', secret).toString(),
              // productCategory: 'all',
              rolId,
            },
          });

          await tx.userInfo.create({
            data: {
              userId: user.id,
              bankNumber:AES.encrypt('', secret).toString(),
              rucNumber: AES.encrypt('', secret).toString(),
            },
          });

          return true;
        });

        return newUser;
      } catch (error) {
        console.log(error);
        throw new GraphQLError('Error al crear usuario');
      }
    },
    userCreateApproved: async (_, values: ICreateUserApproved, context: IContextApp) => {
      if (!context.user) return null;
      if (context.user.role==='USER') return null;

      try {
        const {
          user: {
            address1,
            address2='',
            dni,
            email,
            lastName,
            name,
            password,
            phone,
            code,
            image='',
            moduleId,
          },
          info,
          representative
        } = values;
        // console.log( new Date(Date.now()).toLocaleString() );
        const exists = await prisma.users.findFirst({
          where: {
            email: email.trim(),
          },
        });
        if (exists) return new GraphQLError('El email ' + email + ' ya está registrado');

        const existModule = await prisma.module.findUnique({
          where:{
            id: moduleId
          }
        });
        if(!existModule) return new GraphQLError('No hay módulo para registro');

        const existsRole = await prisma.roles.findFirst({
          where: {slug: 'associate', moduleId: moduleId}
        });
        if (!existsRole) return new GraphQLError('Rol no especificado');

        const availableCode = await prisma.code.findFirst({
          where:{
            code: code.trim(),
          }
        });

        if(availableCode && !availableCode.isActive) return new GraphQLError('Código no disponible');
        if(availableCode && !availableCode.available ) return new GraphQLError('Código ya fue utilizado');
        // console.log(availableCode)
        // return;
        const salt = encrypter.genSaltSync();
        const encryptedPassword = encrypter.hashSync(password.trim(), salt);
        const newUser = await prisma.$transaction(async (tx) => {
          const user = await tx.users.create({
            data: {
              name: AES.encrypt(name, secret).toString(),
              lastName: AES.encrypt(lastName, secret).toString(),
              email: email,
              password: encryptedPassword,
              image: image,
              role: 'USER',
              isActive: true,
              status: 'A',
              approval: 5,
              code: code.trim(),
              phone: AES.encrypt(phone, secret).toString(),
              dni: AES.encrypt(dni, secret).toString(),
              moduleId: existModule.id,
              address1: AES.encrypt(address1, secret).toString(),
              address2: AES.encrypt(address2, secret).toString(),
              // productCategory: 'all',
              rolId: existsRole.id
            },
          });

          await tx.userInfo.create({
            data: {
              ...info,
              userId: user.id,
              bankNumber: AES.encrypt(info.bankNumber, secret).toString(),
              rucNumber: AES.encrypt(info.rucNumber, secret).toString(),
            },
          });
          if(representative){
            await tx.representative.create({
              data: {
                ...representative,
                userId: user.id,
                name: AES.encrypt(representative.name, secret).toString(),
                lastName: AES.encrypt(representative.lastName, secret).toString(),
                email: AES.encrypt(representative.email, secret).toString(),
                phone: AES.encrypt(representative.phone, secret).toString(),
                dni: AES.encrypt(representative.dni, secret).toString(),
                rucNumber: AES.encrypt(representative.rucNumber, secret).toString(),
                bankNumber: AES.encrypt(representative.bankNumber, secret).toString(),
              },
            });
          }
          if(availableCode){
            await tx.code.update({
              data: {
                available: false,
                userId: user.id,
              },
              where:{
                id: availableCode.id
              }
            });
          }else{
            await tx.code.create({
              data:{
                userId: user.id,
                code: code.trim(),
                available: false,
                createdBy: context.user.id
              }
            })
          }
          return true;
        });
        // console.log(eluser);
        return newUser;
      } catch (error) {
        console.log(error);
        throw new GraphQLError('Error al crear usuario');
      }
    },
    userChangePassword: async (_, { currentPassword, newPassword, confirmPassword }, context) => {
      if (!context.user) return null;
      try {
        const user = await prisma.users.findUnique({
          where: { id: parseInt(context.user.id) },
        });
        if (!user) return new GraphQLError('Usuario no encontrado');

        if (!encrypter.compareSync(currentPassword, user.password))
          return new GraphQLError('Contraseña actual incorrecta');

        if (newPassword !== confirmPassword)
          return new GraphQLError('Las contraseñas no coinciden');

        const encryptedPassword = encrypter.hashSync(
          newPassword.trim(),
          encrypter.genSaltSync()
        );

        await prisma.users.update({
          where: {
            id: parseInt(context.user.id),
          },
          data: {
            password: encryptedPassword,
          },
        });
        return true;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    userEdit: async (_, values: IEditUser, context) => {
      if (!context.user) return null;
      try {
        // console.log(values)
        const {
          user: {
            email,
            dni,
            name,
            lastName,
            phone,
            address1,
            address2 = '',
            country = '',
          },
          info,
          representative
        } = values;
        // console.log( new Date(Date.now()).toLocaleString() );
        // console.log(context.user)
        const exists = await prisma.users.findFirst({
          where: {
            email: email,
            id: context.user.id,
          },
        });
        // console.log({exists})
        if (!exists) return new GraphQLError('El usuario no existe');

        if (exists.id !== context.user.id)
          return new GraphQLError('No puede realizar esta acción');

        const newUser = await prisma.$transaction(async (tx) => {
          const user = await tx.users.update({
            data: {
              name: AES.encrypt(name, secret).toString(),
              lastName: AES.encrypt(lastName, secret).toString(),
              email: email,
              phone: AES.encrypt(phone, secret).toString(),
              dni: AES.encrypt(dni, secret).toString(),
              country,
              address1: AES.encrypt(address1, secret).toString(),
              address2: AES.encrypt(address2, secret).toString(),
              status: exists.status==='O' ? 'M' : exists.status,
              updatedAt: new Date()
            },
            where: {
              id: exists.id,
            },
          });
          // console.log({updateUser: user})

          await tx.userInfo.update({
            data: {
              ...info,
              bankNumber: AES.encrypt(info.bankNumber, secret).toString(),
              rucNumber: AES.encrypt(info.rucNumber, secret).toString(),
            },
            where: {
              userId: exists.id,
            },
          });

          if(representative){
            const existsRepresentative = await prisma.representative.findFirst({where:{userId: exists.id}});
            if(existsRepresentative){
              await tx.representative.update({
                data: {
                  ...representative,
                  name: AES.encrypt(representative.name, secret).toString(),
                  lastName: AES.encrypt(representative.lastName, secret).toString(),
                  email: AES.encrypt(representative.email, secret).toString(),
                  phone: AES.encrypt(representative.phone, secret).toString(),
                  dni: AES.encrypt(representative.dni, secret).toString(),
                  rucNumber: AES.encrypt(representative.rucNumber, secret).toString(),
                  bankNumber: AES.encrypt(representative.bankNumber, secret).toString(),
                },
                where: {
                  userId: exists.id,
                },
              });
            }else{
              await tx.representative.create({
                data: {
                  ...representative,
                  userId: exists.id,
                  name: AES.encrypt(representative.name, secret).toString(),
                  lastName: AES.encrypt(representative.lastName, secret).toString(),
                  email: AES.encrypt(representative.email, secret).toString(),
                  phone: AES.encrypt(representative.phone, secret).toString(),
                  dni: AES.encrypt(representative.dni, secret).toString(),
                  rucNumber: AES.encrypt(representative.rucNumber, secret).toString(),
                  bankNumber: AES.encrypt(representative.bankNumber, secret).toString(),
                },
              })
            }
          }

          return user;
        });

        //* send email to pic
        const template = userRegistration({name: name+' '+lastName});
        sendEmail({
          emailTitle: 'Samsung afiliados',
          emailSubject: 'Se ha completado un registro',
          emailReciever: 'daniella.t@cheil.com',
          template: template,
          withCopy: ['cortez.v@cheil.com', 'nicol.a@cheil.com']
        });

        return newUser;
      } catch (error) {
        console.log(error);
        throw new GraphQLError('Error al editar usuario');
      }
    },
    userChangeImage: async (_, { image }, context) => {
      if (!context.user) return null;

      try {
        const user = await prisma.users.update({
          where: {
            id: parseInt(context.user.id),
          },
          data: {
            image: image,
          },
        });

        return user;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    userChangeDniDoc: async (_, { image, type='USER' }:InputChangeUserDoc, context) => {
      if (!context.user) return null;

      try {
        if(type==='REPRESENTATIVE') {
          const existRepresentative = await prisma.representative.findFirstOrThrow({
            where:{
              userId: parseInt(context.user.id)
            }
          })
          if(!existRepresentative) throw new Error('User not found');
          const user = await prisma.representative.update({
            where: {
              userId: parseInt(context.user.id),
            },
            data: {
              dniDoc: image,
            },
          })
          // if(existsRepresentative)
          return true
        }

        if(type==='USER'){
          const user = await prisma.userInfo.update({
            where: {
              userId: parseInt(context.user.id),
            },
            data: {
              dniDoc: image,
            },
          });
          return true
        }

        return false;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    userChangeBankDoc: async (_, { image, type='USER' }:InputChangeUserDoc, context) => {
      if (!context.user) return null;

      try {
        if(type==='REPRESENTATIVE') {
          const existRepresentative = await prisma.representative.findFirstOrThrow({
            where:{
              userId: parseInt(context.user.id)
            }
          })
          if(!existRepresentative) throw new Error('User not found');

          const user = await prisma.representative.update({
            where: {
              userId: parseInt(context.user.id),
            },
            data: {
              bankDoc: image,
            },
          })
          // if(existsRepresentative)
          return true
        }

        if(type==='USER'){
          const user = await prisma.userInfo.update({
            where: {
              userId: parseInt(context.user.id),
            },
            data: {
              bankDoc: image,
            },
          });
          return true
        }

        return false;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    userChangeRucDoc: async (_, { image, type='USER' }:InputChangeUserDoc, context) => {
      if (!context.user) return null;

      try {
        if(type==='REPRESENTATIVE') {
          const existRepresentative = await prisma.representative.findFirstOrThrow({
            where:{
              userId: parseInt(context.user.id)
            }
          })
          if(!existRepresentative) throw new Error('User not found');
          const user = await prisma.representative.update({
            where: {
              userId: parseInt(context.user.id),
            },
            data: {
              rucDoc: image,
            },
          })
          // if(existsRepresentative)
          return true
        }

        if(type==='USER'){
          const user = await prisma.userInfo.update({
            where: {
              userId: parseInt(context.user.id),
            },
            data: {
              rucDoc: image,
            },
          });
          return true
        }

        return false;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    userChangeCertDoc: async (_, { image, type='USER' }:InputChangeUserDoc, context) => {
      if (!context.user) return null;

      try {
        if(type==='REPRESENTATIVE') {
          const existRepresentative = await prisma.representative.findFirstOrThrow({
            where:{
              userId: parseInt(context.user.id)
            }
          })
          if(!existRepresentative) throw new Error('User not found');
          const user = await prisma.representative.update({
            where: {
              userId: parseInt(context.user.id),
            },
            data: {
              validityCert: image,
            },
          })
          // if(existsRepresentative)
          return true
        }

        if(type==='USER'){
          const user = await prisma.userInfo.update({
            where: {
              userId: parseInt(context.user.id),
            },
            data: {
              validityCert: image,
            },
          });
          return true
        }

        return false;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    userChangeContractDoc: async (_, { image, type='USER' }:InputChangeUserDoc, context) => {
      if (!context.user) return null;

      try {
        if(type==='REPRESENTATIVE') {
          const existRepresentative = await prisma.representative.findFirstOrThrow({
            where:{
              userId: parseInt(context.user.id)
            }
          })
          if(!existRepresentative) throw new Error('User not found');
          const user = await prisma.representative.update({
            where: {
              userId: parseInt(context.user.id),
            },
            data: {
              contract: image,
            },
          })
          // if(existsRepresentative)
          return true
        }

        if(type==='USER'){
          const user = await prisma.userInfo.update({
            where: {
              userId: parseInt(context.user.id),
            },
            data: {
              contract: image,
            },
          });
          return true
        }

        return false;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    userChangeStatus: async (_,{ approval, status, id, comment, isSpecial}: InputChangeUserStatus, context: IContextApp) => {
      if (!context.user) return null;
      // console.log({ approval, status, id, comment})
      try {
        const existsRole = await prisma.roles.findFirst({
          where: {slug: 'associate'}
        });
        if (!existsRole) return new GraphQLError('Rol no especificado');

        const existsUser = await prisma.users.findFirst({
          where:{
            id: parseInt(id+'')
          }
        });

        if(!existsUser) return new GraphQLError('No Existe el usuario');
        
        // TODO: Verify pending (comparison of roles id)
        // if(context.user.roles.id==existsRole.id) return new GraphQLError('No puede realizar esta acción');
        const availableCode = await prisma.code.findFirst({
          where:{
            isActive: true,
            available: true,
          }
        });
        // console.log({availableCode})
        if (!availableCode && approval===5) return new GraphQLError('No hay códigos disponibles');
        const completed = await prisma.$transaction(async (tx) => {
          const user = await tx.users.update({
            where: {
              id: existsUser.id,
            },
            data: {
              approval: approval,
              status: status+'',
              // normal user revievs code from bd and influencer gets null
              code: approval===5 ? availableCode.code : null,
              isSpecial,
              isObserved: approval===5 ? false : existsUser.isObserved,
            },
          });

          // is not influencer, make code unavailable
          if(approval===5 ){
            await tx.code.update({
              data: {
                available: false,
                userId: parseInt(id+''),
              },
              where:{
                id: availableCode.id
              }
            });
            const template = registerComplete({
              name: AES.decrypt(user.name, secret).toString(enc.Utf8),
              url: process.env.FRONT_URL,
            });
            sendEmail({
              emailTitle: 'Samsung afiliados',
              emailSubject: '¡Tu cuenta ha sido confirmada!',
              emailReciever: user.email.trim(),
              template: template,
            });
          }
          return true;
        });



        return completed;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    userAssignSpecialCode: async (_,{ id, code, status}:{id:number,code:string, status: 'A' | 'C'}, context: IContextApp) => {
      if (!context.user) return null;
      
      try {
        const existsRole = await prisma.roles.findFirst({
          where: {slug: 'associate'}
        });
        if (!existsRole) return new GraphQLError('Rol no especificado');

        const existsUser = await prisma.users.findFirst({
          where:{
            id: id
          }
        });
        if(!existsUser) return new GraphQLError('No Existe el usuario');
        if(existsUser.code) return new GraphQLError('El usuario ya tiene un código asignado');

        const existsCode = await prisma.code.findFirst({
          where:{
            code: code.trim(),
          }
        });
        if (existsCode && !existsCode.available) return new GraphQLError('El código ya fue asignado anteriormente.');
        // const template = approveUserTemplate(process.env.FRONT_URL);
        const completed = await prisma.$transaction(async (tx) => {
          const user = await tx.users.update({
            where: {
              id: id,
            },
            data: {
              code: code.trim(),
              approval: status==='A' ? 5 : existsUser.approval,
              status,
            },
          });
          if(existsCode){
            await tx.code.update({
              data: {
                available: false,
                userId: id
              },
              where:{
                id: existsCode.id
              }
            });
          }else{
            await tx.code.create({
              data: {
                available: false,
                code: code.trim(),
                userId: id,
                createdBy: context.user.id
              }
            });
          }
          if (status==='A' || status==='C') {
            const template = registerComplete({
              name: AES.decrypt(user.name, secret).toString(enc.Utf8),
              url: process.env.FRONT_URL,
            });
            sendEmail({
              emailTitle: 'Samsung afiliados',
              emailSubject: '¡Tu cuenta ha sido confirmada!',
              emailReciever: user.email.trim(),
              template: template,
            });
          }
          return true;
        });

        return completed;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    userToggleActive: async (_,{ status, id}: {id:string, status:boolean}, context) => {
      if (!context.user) return null;
      if(context.user.role=='USER') return new GraphQLError('No puede realizar esta acción');
      const user = await prisma.users.findUnique({
        where:{
          id: parseInt(id+'')
        }
      });
      if(!user) return new GraphQLError('No Existe el usuario');
      if(context.user.role==='ADMIN' && user.role==='ROOT') return new GraphQLError('No tiene permisos suficientes');
      if(context.user.role==='ADMIN' && user.role==='ADMIN') return new GraphQLError('No tiene permisos suficientes');
      if(context.user.role==='ROOT' && user.role==='ROOT' && status===false) return new GraphQLError('No se puede realizar esta acción');
      try {
        await prisma.users.update({
          where: {
            id: parseInt(id),
          },
          data: {
            isActive: status,
          },
        });

        return true;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    userDelete: async (_,{ idUser }: {idUser: number}, context) => {
      if (!context.user) return null;
      if(context.user.role=='USER') return new GraphQLError('No puede realizar esta acción');
      const existsUser = await prisma.users.findUnique({
        where:{
          id: idUser
        }
      });
      if(!existsUser) return new GraphQLError('No Existe el usuario');
      if(context.user.role==='ADMIN' && existsUser.role==='ROOT') return new GraphQLError('No tiene permisos suficientes');
      if(context.user.role==='ADMIN' && existsUser.role==='ADMIN') return new GraphQLError('No tiene permisos suficientes');
      if(context.user.role==='ROOT' && existsUser.role==='ROOT') return new GraphQLError('No se puede realizar esta acción');
      try {
        const existsCode = await prisma.code.findFirst({
          where:{
            userId: existsUser.id
          }
        });

        const deletedUser = await prisma.$transaction(async (tx) => {
          const user = await tx.users.delete({
            where: {
              id: existsUser.id,
            },
          });
          if(existsCode){
            await tx.code.delete({
              where:{
                id: existsCode.id
              }
            });
          }

          await tx.userHistory.create({
            data: {
              email: user.email,
              tableName: 'Users',
              code: existsCode ? existsCode.code : '',
              action: 'DELETE',
              createdBy: context.user.id,
            }
          })

          return true;
        });

        return deletedUser;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    userRegister: async (_, values: IRegisterUser) => {
      try {
        const {
          name,
          lastName,
          email,
          password,
          image = '',
          phone,
          dni,
          country='',
          address1,
          address2 = '',
          page,
          parameters,
          checkTerms = false,
          checkPrivacy = false,
        } = values;
        // console.log( new Date(Date.now()).toLocaleString() );
        const exists = await prisma.users.findFirst({
          where: {
            email: email,
          },
        });
        if (exists) return new GraphQLError('El email ' + email + ' ya está registrado');
        const existsRole = await prisma.roles.findFirst({
          where: {slug: 'associate', name: 'Asociado Deals'}
        });
        if (!existsRole) return new GraphQLError('Rol no especificado');

        const existModule = await prisma.module.findFirst({
          where:{
            name: 'Deals'
          }
        });
        if(!existModule) return new GraphQLError('No hay modulo para registro');

        const salt = encrypter.genSaltSync();
        const encryptedPassword = encrypter.hashSync(password.trim(), salt);
        const newUser = await prisma.$transaction(async (tx) => {
          const user = await tx.users.create({
            data: {
              name: AES.encrypt(name, secret).toString(),
              lastName: AES.encrypt(lastName, secret).toString(),
              email: email,
              password: encryptedPassword,
              image: image,
              role: 'USER',
              isActive: true,
              status: 'P',
              approval: 1,
              phone: AES.encrypt(phone, secret).toString(),
              dni: AES.encrypt(dni, secret).toString(),
              country,
              moduleId: existModule.id,
              address1: AES.encrypt(address1, secret).toString(),
              address2: AES.encrypt(address2, secret).toString(),
              // productCategory: 'all',
              rolId: existsRole.id
            },
          });

          await tx.userInfo.create({
            data: {
              userId: user.id,
              bankNumber:AES.encrypt('', secret).toString(),
              rucNumber: AES.encrypt('', secret).toString(),
              checkTerms,
              checkPrivacy,
            },
          });

          await tx.pageTracking.create({
            data: {
              idUser: user.id,
              page,
              parameters
            }
          })

          return true;
        });
        const template = registerSuccess({
          // name: AES.decrypt(newUser.name, secret).toString(enc.Utf8),
          url: process.env.FRONT_URL + '/auth/login/',
        });
        sendEmail({
          emailTitle: 'Samsung afiliados',
          emailSubject: '¡Se creo tu cuenta️! ✔ Ahora, completa tu documentación🚨',
          emailReciever: email.trim(),
          template: template,
        });

        // console.log(eluser);
        return newUser;
      } catch (error) {
        console.log(error);
        throw new GraphQLError('Error al crear usuario');
      }
    },
    userEditCode: async (_, { idUser, code }: {idUser: number, code: string}, context) => {
      if (!context.user) return null;
      if(context.user.role=='USER') return new GraphQLError('No puede realizar esta acción');
      const existsUser = await prisma.users.findUnique({
        where:{
          id: idUser
        }
      });
      if(!existsUser) return new GraphQLError('No Existe el usuario');
      if(!existsUser.code || existsUser.code.trim()=='') return new GraphQLError('No tiene código asignado');

      const existsUserCode = await prisma.code.findFirst({
        where:{
          userId: existsUser.id
        }
      });
      if(!existsUserCode) return new GraphQLError('No tiene código asignado');

      const existsAssignedCode = await prisma.code.findFirst({
        where:{
          code: code.trim(),
        }
      });
      if (existsAssignedCode) return new GraphQLError('Código ya asignado');

      try {
        const changedCode = await prisma.$transaction(async (tx) => {
          await tx.code.update({
            data: {
              code: code.trim(),
            },
            where:{
              code: existsUserCode.code,
              userId: existsUser.id,
            }
          });

          await tx.users.update({
            where: {
              id: idUser,
            },
            data: {
              code: code.trim(),
            },
          });

          await tx.codeHistory.create({
            data: {
              code: existsUser.code,
              userId: existsUser.id,
              createdBy: context.user.id,
              action: 'EDIT',
              email: existsUser.email,
            }
          })


          return true;
        });

        return changedCode;
      } catch (error) {
        console.log(error);
        return null;
      }
      
    },
    userPreApprove: async (_,{ approval, status, id, isSpecial}: InputPreApprove, context: IContextApp) => {
      if (!context.user) return null;
      // console.log({ approval, status, id})
      if(approval!=4 ) return new GraphQLError('No puede realizar esta acción');
      try {
        const existsRole = await prisma.roles.findFirst({
          where: {slug: 'associate'}
        });
        if (!existsRole) return new GraphQLError('Rol no especificado');

        const exitsUser = await prisma.users.findFirst({
          where:{
            id: parseInt(id+'')
          }
        });
        if(!exitsUser) return new GraphQLError('No Existe el usuario');

        const availableCode = await prisma.code.findFirst({
          where:{
            isActive: true,
            available: true,
          }
        });
        // console.log({availableCode})
        if (!availableCode && status==='C') return new GraphQLError('No hay códigos disponibles');
        const completed = await prisma.$transaction(async (tx) => {
          const user = await tx.users.update({
            where: {
              id: exitsUser.id,
            },
            data: {
              approval: approval,
              status: status+'',
              // normal user revievs code from bd and influencer gets null
              code: status === 'C' ? availableCode.code : null,
              isSpecial,
            },
          });

          // is not influencer, make code unavailable
          if(status==='C'){
            await tx.code.update({
              data: {
                available: false,
                userId: parseInt(id+''),
              },
              where:{
                id: availableCode.id
              }
            });
            const template = registerComplete({
              name: AES.decrypt(user.name, secret).toString(enc.Utf8),
              url: process.env.FRONT_URL,
            });
            sendEmail({
              emailTitle: 'Samsung afiliados',
              emailSubject: '¡Tu cuenta ha sido confirmada!',
              emailReciever: user.email.trim(),
              template: template,
            });
          }
          return true;
        });



        return completed;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    userPreApproveComplete: async (_,{ approval, id}: InputPreApprove, context: IContextApp) => {
      if (!context.user) return null;
      // console.log({ approval, status, id})
      if(approval!=4 ) return new GraphQLError('No puede realizar esta acción');
      try {
        const existsRole = await prisma.roles.findFirst({
          where: {slug: 'associate'}
        });
        if (!existsRole) return new GraphQLError('Rol no especificado');

        const exitsUser = await prisma.users.findFirst({
          where:{
            id: parseInt(id+'')
          }
        });
        if(!exitsUser) return new GraphQLError('No Existe el usuario');

        const completed = await prisma.$transaction(async (tx) => {
          const user = await tx.users.update({
            where: {
              id: exitsUser.id,
            },
            data: {
              approval: 5,
              status: 'A',
              isObserved: false,
            },
          });

          const template = registerComplete({
            name: AES.decrypt(user.name, secret).toString(enc.Utf8),
            url: process.env.FRONT_URL,
          });
          sendEmail({
            emailTitle: 'Samsung afiliados',
            emailSubject: '¡Tu cuenta ha sido confirmada!',
            emailReciever: user.email.trim(),
            template: template,
          });
          return true;
        });



        return completed;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    userObserved: async (_,{id, comment, isObserved}: InputObserveUser, context: IContextApp) => {
      if (!context.user) return null;
      // console.log({ id, comment, isObserved})
      try {
        const existsRole = await prisma.roles.findFirst({
          where: {slug: 'associate'}
        });
        if (!existsRole) return new GraphQLError('Rol no especificado');

        const exitsUser = await prisma.users.findFirst({
          where:{
            id: id,
          }
        });
        if(!exitsUser) return new GraphQLError('No Existe el usuario');
        if(exitsUser.approval===5) return new GraphQLError('El usuario ya esta aprobado');

        const completed = await prisma.$transaction(async (tx) => {
          const user = await tx.users.update({
            where: {
              id: id,
            },
            data: {
              isObserved: isObserved,
            },
          });
          await tx.userInfo.update({
            data:{
              comment
            },
            where:{
              userId: user.id
            }
          });

          if(isObserved){
            const template = observedUser({
              name: AES.decrypt(user.name, secret).toString(enc.Utf8),
              comment,
            });
            sendEmail({
              emailTitle: 'Samsung afiliados',
              emailSubject: 'Hemos observado tu registro🔍 ¡Entérate más aquí! 🚨',
              emailReciever: user.email.trim(),
              template: template,
              withHiddenCopy: ['daniella.t@cheil.com', 'nicol.a@cheil.com']
            });
          }

          return true;
        });
        return completed;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  },
};
