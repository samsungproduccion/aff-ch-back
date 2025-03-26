import gql from 'graphql-tag';

export const types = gql`
  type Code {
    id: ID!
    code: String!
    userId: Int
    isActive: Boolean!
    available: Boolean!
    createdAt: Float!
    createdBy: Int!
  }
`;
export const query = gql`
  type Query {
    codeGetAll: [Code]
    codeGetAvailables: [Code]
  }
`;
export const Mutations = gql`
  type Mutation {
    codeCreate(
      code: String!
    ): Boolean
    codeCreateMany(
      codes: [String]!
    ): Boolean
  }
`;
