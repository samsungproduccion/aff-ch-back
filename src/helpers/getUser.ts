import jwt from 'jsonwebtoken';
import { prisma } from '../config/prismaDB';

export const getUser = async (token: string) => {
  if (!token) return null;
  // throw new AuthenticationError('No estas logeado');

  try {
    const SECRET = process.env.SECRET || '';
    // console.log(SECRET);
    const { uid } = jwt.verify(token, SECRET!) as { uid: string };
    const user = await prisma.users.findUnique({
      where: { id: parseInt(uid) },
      // include: {
      //   userInfo: true,
      //   roles: {
      //     include:{
      //       menu: true
      //     }
      //   },
      //   representative: true,
      //   module: true,
      // },
    });
    // console.log(user)
    return user;
  } catch (error) {
    // console.log({error})
    return null;
  }
};
