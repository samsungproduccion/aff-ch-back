import { PrismaClient } from '@prisma/client';
import encrypter from 'bcryptjs';
import { AES } from 'crypto-js';
import { roles } from './data/roles';
import { menuList } from './data/menu';
import { benefits } from './data/benefits';
import { categoryList } from './data/categories';
const secret = process.env.SECRYPT || '';

const prisma = new PrismaClient();

async function main() {
  const existsRootSeed = await prisma.seed.findFirst({
    where: { name: 'ROOTSEED' },
  });
  if (!existsRootSeed) throw new Error('DO NOT EXISTS ROOTSEED');
  if (existsRootSeed.hasDone) throw new Error('SEED ALREADY DONE');

  const salt = encrypter.genSaltSync();
  const encryptedPassword = encrypter.hashSync('123456'.trim(), salt);

  await prisma.$transaction(async (tx) => {
    const module = await tx.module.create({
      data: {
        name: 'Epp Members',
        slug: 'members',
      },
    });
    await tx.roles.createMany({
      data: roles,
    });

    const globalRole = await tx.roles.findFirst({
      where: { slug: 'global' },
    });

    if (!globalRole) return null;

    await tx.authSetting.createMany({
      data: [
        {rolId: 1, isRestricted: false},
        {rolId: 2},
        {rolId: 3},
        {rolId: 4},
        {rolId: 5, isRestricted: false},
      ]
    });

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
        moduleId: module.id,
        phone: AES.encrypt('112121212', secret).toString(),
        dni: AES.encrypt('12121212', secret).toString(),
        country: 'Chile',
        address1: AES.encrypt('direccion', secret).toString(),
        address2: AES.encrypt('', secret).toString(),
        // productCategory: 'all',
        rolId: globalRole.id,
      },
    });

    await tx.userInfo.create({
      data: {
        userId: user.id,
        rucNumber: AES.encrypt('1212123212', secret).toString(),
        bankNumber: AES.encrypt('1212123212', secret).toString(),
      },
    });

    await tx.authSetting.create({
      data: {
        rolId: globalRole.id
      }
    })

    await tx.menu.createMany({
      data: menuList,
    })

    await tx.benefit.createMany({
      data: benefits.map(bf => (
        {
          name: bf.name,
          createdBy: user.id,
        })),
    });

    await tx.rolesOnMenus.createMany({
      data:[
        {
          menuId: 13,
          rolId: 5,
        },
        {
          menuId: 15,
          rolId: 5,
        },
        {
          menuId: 5,
          rolId: 5,
        },
        {
          menuId: 2,
          rolId: 5,
        },
      ]
    })

    await tx.category.createMany({
      data: categoryList
    });

    await tx.seed.update({
      where: { id: existsRootSeed.id },
      data: {
        hasDone: true,
      },
    });

    return true;
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
