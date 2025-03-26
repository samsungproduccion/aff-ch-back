import { IResolvers } from '@graphql-tools/utils';
import { GraphQLError } from 'graphql';
import { prisma } from '../../config/prismaDB';
import { getWeekDay } from '../../helpers/dateTransformation';
import { ICreateTransaction, ICreateTransactions } from '../../interfaces/transactions';

export const transactionResolver: IResolvers = {
  Query: {
    transactionsGetAll: async (_, __, context) => {
      if (!context.user) return null;

      try {
        const transaction = await prisma.transaction.findMany({
          where: {
            isActive: true,
          }
        });
        return transaction;
      } catch (error) {
        return null;
      }
    },
    transactionsGetByUserId: async (_, { id }, context) => {
      if (!context.user) return null;
      try {
        const transaction = await prisma.transaction.findMany({
          where: {
            id: parseInt(id),
          },
        });
        return transaction;
        
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    transactionsGetNumber: async (_, { quantity }: {quantity: number}, context) => {
      if (!context.user) return null;
      try {
        const transactions = await prisma.transaction.findMany({
          orderBy:{
            operationDate: 'desc',
          },
          take: quantity
        });
        return transactions;
        
      } catch (error) {
        console.log(error)
        return null;
      }
    },
    transactionsGetByUserCode: async (_, { code, from, to }:{code:string, from: string, to: string}, context) => {
      if (!context.user) return null;
      // console.log({from,to})
      try {
        const transaction = await prisma.transaction.findMany({
          where: {
            affiliateCode: code,
            operationDate: {
              gte: new Date(from),
              lte: new Date(to),
            },
          },
          // orderBy:{
          //   operationDate: 'asc'
          // }
        });
        if(!transaction) return null;
        if(transaction.length===0) return null;
        const newTransactions = transaction.map(ts => ({
          total: ts.totalAmount,
          cantidadOrdenes: ts.orderAmount,
          codigoAfiliado: ts.affiliateCode,
          fecha: ts.operationDate.toISOString().split('T')[0],
          semana: getWeekDay(ts.operationDate)
        }))
        // console.log(newTransactions);
        const result = newTransactions.reduce((acc, curr) => {
          let item = acc.find(item => item.semana === curr.semana);
        
          if (item) {
            item.total =  parseFloat((item.total + curr.total).toFixed(2));
          } else {
            acc.push(curr);
          }
        
          return acc;
        }, []);
        return result;
      } catch (error) {
        console.log(error)
        return null;
      }
      
    },
    transactionsGetByDate: async (_, { from, to }:{from: string, to: string}, context) => {
      if (!context.user) return null;
      // console.log({from,to})
      try {
        const transaction = await prisma.transaction.findMany({
          where: {
            operationDate: {
              gte: new Date(from),
              lte: new Date(to),
            },
          },
          // orderBy:{
          //   operationDate: 'asc'
          // }
        });
        if(!transaction) return null;
        if(transaction.length===0) return null;
        const newTransactions = transaction.map(ts => ({
          total: ts.totalAmount,
          cantidadOrdenes: ts.orderAmount,
          codigoAfiliado: ts.affiliateCode,
          fecha: ts.operationDate.toISOString().split('T')[0],
          semana: getWeekDay(ts.operationDate)
        }))
        // console.log(newTransactions);
        const result = newTransactions.reduce((acc, curr) => {
          let item = acc.find(item => item.semana === curr.semana);
        
          if (item) {
            item.total =  parseFloat((item.total + curr.total).toFixed(2));
          } else {
            acc.push(curr);
          }
        
          return acc;
        }, []);
        return result;
        
      } catch (error) {
        console.log(error)
        return null;
      }
    },
  },
  Mutation: {
    transactionsCreate: async (_, values: ICreateTransaction, context) => {
      if (!context.user) return null;
      if (context.user.role!=='ADMIN') return null;
      // const today = new Date();
      try {
        await prisma.transaction.create({
          data: {
            ...values,
            createdBy: context.user.id
          },
        });

        return true;
      } catch (error) {
        console.log(error);
        throw new GraphQLError('Error al crear orden');
      }
    },
    transactionsCreateMany: async (_, values: ICreateTransactions, context) => {
      if (!context.user) return null;
      if (context.user.role!=='ADMIN') return null;
      try {
      const {transactions} = values;
      // console.log(values)
      // const today = new Date();
      const creationArr = transactions.map( ts => {
        return {
          ...ts,
          operationDate: new Date(ts.operationDate),
          createdBy: context.user.id
        }
      })
        await prisma.transaction.createMany({
          data: creationArr,
        });

        return true;
      } catch (error) {
        console.log(error);
        throw new GraphQLError('Error al crear ordenes!');
      }
    },
  },
};
