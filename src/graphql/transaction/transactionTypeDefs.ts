import gql from 'graphql-tag';

export const types = gql`
  type Transaction {
    id: ID!
    totalAmount: Float!
    orderAmount: Int!
    affiliateCode: String!
    operationDate: Float!
    isActive: Boolean!
    clientName: String
    sku: String
    subTotal: Float
    total: Float
    paymentType: String
    status: String
    discount: Float
    coupon: String
    createdBy: Int!
    createdAt: Float!
    updatedBy: String
    updatedAt: Float
  }
  input TransactionCreate{
    totalAmount: Float!
    orderAmount: Int!
    affiliateCode: String!
    operationDate: String!
  }
  type TransactionResponseEsp{
    total: Float!
    cantidadOrdenes: Int!
    codigoAfiliado: String!
    fecha: String!
    semana: String!
  }
`;
export const query = gql`
  type Query {
    transactionsGetAll: [Transaction]
    transactionsGetByUserId(id: Int!): [Transaction]
    transactionsGetNumber(quantity: Int!): [Transaction]
    transactionsGetByUserCode(code: String!, from: String!, to: String!): [TransactionResponseEsp]
    transactionsGetByDate(from: String!, to: String!): [TransactionResponseEsp]
  }
`;
export const Mutations = gql`
  type Mutation {
    transactionsCreate(
      totalAmount: Float!
      orderAmount: Int!
      affiliateCode: String!
      operationDate: Float!
    ): Boolean
    transactionsCreateMany(
      transactions: [TransactionCreate]
    ): Boolean
  }
`;
