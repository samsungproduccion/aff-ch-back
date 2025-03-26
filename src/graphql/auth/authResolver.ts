import { IResolvers } from '@graphql-tools/utils';
import { GraphQLError } from 'graphql';
import { prisma } from '../../config/prismaDB';
import encrypter from 'bcryptjs';
import { generateJWT, verifyJWT } from '../../helpers/jwebtoken';
import { AES, enc } from 'crypto-js';
import { sendEmail } from '../../helpers/sendEmail';
import { restorePasswordv3 } from '../../utils/mails/restorePasswordv3';
import { restoreSuccess } from '../../utils/mails/restoreSuccess';
import { IContextApp } from '../../interfaces/user';
import { getDaysDiff } from '../../helpers/dates';
import { validateEmailMFA } from '../../utils/mails/validateEmailMFA';
import { IValidateMfa } from '../../interfaces/auth.interface';


export const AuthResolver: IResolvers = {
  Query: {
    authGetUsers: async (_, __, context) => {
      // if (!context.user) return null;

      try {
        const users = await prisma.users.findMany();
        return users;
      } catch (error) {
        return null;
      }
    },
    authGetUser: async (_, __, context) => {
      // console.log(context.user)
      if (!context.user) return null;
      return context.user;
    },
  },
  Mutation: {
    isloged: async (_, { token }, context) => {
      // console.log({token})
      if (!token) return null;
      try {
        verifyJWT(token);
        // console.log({moduleId: context.user.module ,roles: context.user.roles});
        // console.log(context.user)
        if (
          context.user &&
          context.user.module &&
          context.user.roles.slug === 'associate' &&
          context.user.module.name == 'Epp Members'
        ) {
          // console.log('es epp ')
          context.user.roles.menus = 'profile,products,setting,offers';
          // console.log(context.user.roles.menus)
        }
        // console.log(context.user.roles)
        return context.user;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    authLogin: async (_, { email, password }) => {
      try {
        // const result = await prisma.$queryRaw`SELECT * FROM Users`;
        // const mongoResult = await mongoose.connection.db.collection('users').find({}).toArray();
        // console.log(mongoResult);
        const today = new Date();
        let user = await prisma.users.findFirst({
          where: { email: email.trim() },
          include: { roles: { include: { authSettings: true } } },
        });
        // console.log(user)
        if (!user) {
          return new GraphQLError('El usuario ' + email + ' no existe');
        }
        // console.log(user)
        if (!user.isActive) return new GraphQLError('El usuario esta desactivado.')
        if (!user.roles.authSettings) return new GraphQLError('Error al verificar usuario');
        const authSetting = user.roles.authSettings;
        const loginBlockTime: number = authSetting.loginBlockTime * 60 * 1000;

        const currentTime = Date.now();
        const lastAttempt = user.lastLoginTry ? user.lastLoginTry.getTime() : 0;
        const timeSinceLastAttempt = currentTime - lastAttempt;

        if (!user.isLoginActive  && timeSinceLastAttempt < loginBlockTime) {
          const minutesLeft =  Math.ceil(authSetting.loginBlockTime -(timeSinceLastAttempt/60000));
          return new GraphQLError('Intentelo en ' + minutesLeft + ' minutos');
        }
        // console.log({today, currentTime, lastAttempt, timeSinceLastAttempt})
        if(!user.isLoginActive && timeSinceLastAttempt > loginBlockTime){
          user = await prisma.users.update({
            where: {id: user.id},
            data: {isLoginActive: true},
            include: { roles: { include: { authSettings: true } } },
          })
          // console.log(user)
        }
        

        const validatePassword = encrypter.compareSync(password, user.password);
        if (!validatePassword) {
          //* validate if attepms > 5
          await prisma.users.update({
            where:{ id: user.id },
            data:{ attemps: user.attemps+1, lastLoginTry: today }
          });
          if(user.approval==5 && user.attemps>=authSetting.maxAttempts){
            await prisma.users.update({
              where:{ id: user.id },
              data:{attemps: 0, lastLoginTry: today, isLoginActive: false}
            });
            return new GraphQLError('Intentelo en '+authSetting.loginBlockTime+' minutos')
          }
          return new GraphQLError('Usuario / password incorrectos')
        };

        //* generate JWT
        const token = await generateJWT(user.id.toString());

        // console.log(user.roles.authSettings);
        if (user.roles.authSettings.isRestricted) {
          
          // console.log(authSetting)
          //* Check if password has expired
          const daysDiff = getDaysDiff(user.lastPwdChange, new Date());
          // console.log({daysDiff});
          if (daysDiff > authSetting.pwdExpiration) {
            // console.log('expired');
            return {
              token: token,
              approval: 0,
              expired: true,
              mfa: authSetting.mfa,
            };
          }
          //*  Validate if MFA is activated
          if(authSetting.mfa){
            // console.log({mfaExp: authSetting.mfaExpiration})
            await prisma.multiFactorAuth.updateMany({
              where: {
                userId: user.id
              },
              data: {
                isActive: false
              }
            });

            const tokenMfa = await generateJWT(user.id.toString(), authSetting.mfaExpiration+'m');
            const code = Math.floor(100000 + Math.random() * 900000);

            await prisma.multiFactorAuth.create({
              data: {
                token: tokenMfa+'',
                email,
                type: 'EMAIL',
                code: code+'',
                userId: user.id,
              }
            });
            await prisma.users.update({
              where:{ id: user.id },
              data:{attemps: 0, lastLoginTry: today}
            });
            const template = validateEmailMFA({code: code+'', time: authSetting.mfaExpiration+''});
            sendEmail({
              emailTitle: 'Verificación de Seguridad',
              emailSubject: 'Se necesita verficicación',
              emailReciever: email.trim(),
              template: template,
            });
            return {
              token: tokenMfa,
              approval: user.role === 'ADMIN' ? 5 : user.approval,
              expired: false,
              mfa: authSetting.mfa,
            };
          }
          await prisma.users.update({
            where:{ id: user.id },
            data:{attemps: 0, lastLoginTry: today}
          });
          return {
            token: token,
            approval: user.role === 'ADMIN' ? 5 : user.approval,
            expired: false,
            mfa: authSetting.mfa,
          };
        }

        // console.log(token);
        return {
          token: token,
          approval: user.role === 'ADMIN' ? 5 : user.approval,
          expired: false,
          mfa: false,
        };
      } catch (error) {
        console.log(error);
        throw new GraphQLError('Error al iniciar sesión');
      }
    },
    authMfaEmailValidate: async (_, { token, code }: IValidateMfa, context) => {
      // console.log({token})
      if (!token) return null;
      try {
        verifyJWT(token);
        const isValidRequest = await prisma.multiFactorAuth.findFirst({
          where:{
            token,
            isActive: true,
          }
        });
        if(!isValidRequest) return new GraphQLError('Solicitud no valida');

        // console.log(isValidRequest)
        const user = await prisma.users.findUnique({
          where: {
            id: isValidRequest.userId,
          }
        });
        if(!user) return new GraphQLError('Usuario no encontrado')
        
        

        if(isValidRequest.code !== code) return new GraphQLError('Código incorrecto') 

        const loginToken = await generateJWT((isValidRequest.userId).toString());

        await prisma.multiFactorAuth.update({
          where:{
            id: isValidRequest.id
          },
          data:{
            isActive: false,
          }
        })
          
        return {
          token: loginToken,
          approval: user.role === 'ADMIN' ? 5 : user.approval,
        };
      } catch (error) {
        console.log(error)
        throw new GraphQLError('Token expiro');
      }
    },
    authRestorePassword: async (_, { email }, __) => {
      const secret = process.env.SECRYPT || '';
      try {
        // const existRequest = await prisma.resetPassword.findFirst({
        //   where: {
        //     email: email,
        //     status: false,
        //   },
        // });
        // if (existRequest) return new UserInputError('Ya existe una solicitud, verifique su correo');

        const user = await prisma.users.findUnique({ where: { email: email } });
        if (!user) return new GraphQLError('Usuario no encontrado');
        await prisma.resetPassword.updateMany({
          where: {
            email: email,
          },
          data: {
            status: true,
          },
        });
        const token = await generateJWT(user.id.toString(), '24h');
        const reset = await prisma.resetPassword.create({
          data: {
            email: email,
            token: token as string,
            status: false,
          },
        });
        const template = restorePasswordv3({
          url: process.env.FRONT_URL + '/auth/restore/' + token,
          name: AES.decrypt(user.name, secret).toString(enc.Utf8),
        });
        sendEmail({
          emailTitle: 'Samsung afiliados',
          emailSubject: '¿Olvidó su contraseña?',
          emailReciever: email.trim(),
          template: template,
        });
        return reset;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    authVerifyRestoreJWT: async (_, { token }, __) => {
      if (!token) return null;
      try {
        const result = await prisma.resetPassword.findFirst({
          where: {
            token: token,
            status: false,
          },
        });
        if (!result) return new GraphQLError('Token no encontrado');
        return result;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    authResetPassword: async (
      _,
      { token, email, newPassword, repeatPassword },
      __
    ) => {
      const secret = process.env.SECRYPT || '';
      // console.log({token, email, newPassword, repeatPassword})
      if (!token) return null;
      try {
        const result = await prisma.resetPassword.findFirst({
          where: {
            token: token,
            status: false,
          },
        });
        if (!result) return new GraphQLError('Token no válido');
        if (newPassword !== repeatPassword)
          return new GraphQLError('Las contraseñas no coinciden');
        const salt = encrypter.genSaltSync();
        const encryptedPassword = encrypter.hashSync(newPassword.trim(), salt);
        const updatedUser = await prisma.users.update({
          where: {
            email: email,
          },
          data: {
            password: encryptedPassword,
          },
        });
        await prisma.resetPassword.update({
          where: {
            id: result.id,
          },
          data: {
            status: true,
          },
        });

        const template = restoreSuccess({
          name: AES.decrypt(updatedUser.name, secret).toString(enc.Utf8),
          urlLogin: process.env.FRONT_URL + '/auth/login/',
          urlRestore: process.env.FRONT_URL + '/auth/restore/',
        });
        sendEmail({
          emailTitle: 'Samsung afiliados',
          emailSubject: '¡Contraseña actualizada!',
          emailReciever: email.trim(),
          template: template,
        });

        return updatedUser;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    authRenewPassword: async (_, { token, oldPassword, newPassword, repeatPassword }, __) => {
      if (!token) return null;
      const secret = process.env.SECRYPT || '';
      try {
        const userId = verifyJWT(token);

        const user = await prisma.users.findUnique({
          where: {
            id: parseInt(userId),
          }
        })
        if(!user ) return new GraphQLError('No se valido el usuario');

        const validatePassword = encrypter.compareSync(oldPassword, user.password);
        if (!validatePassword) return new GraphQLError('La contraseña actual es incorrecta');

        if (newPassword !== repeatPassword) return new GraphQLError('Las contraseñas no coinciden');

        const salt = encrypter.genSaltSync();
        const encryptedPassword = encrypter.hashSync(newPassword.trim(), salt);
        const updatedUser = await prisma.users.update({
          where: {
            id: user.id,
          },
          data: {
            password: encryptedPassword,
            lastPwdChange: new Date()
          },
        });

        const loginToken = await generateJWT((user.id).toString());

        const template = restoreSuccess({
          name: AES.decrypt(updatedUser.name, secret).toString(enc.Utf8),
          urlLogin: process.env.FRONT_URL + '/auth/login/',
          urlRestore: process.env.FRONT_URL + '/auth/restore/',
        });
        sendEmail({
          emailTitle: 'Samsung afiliados',
          emailSubject: '¡Contraseña actualizada!',
          emailReciever: user.email.trim(),
          template: template,
        });

        return {
          token: loginToken,
          approval: user.role === 'ADMIN' ? 5 : user.approval,
          expired: false,
          mfa: false,
        };
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  },
};
