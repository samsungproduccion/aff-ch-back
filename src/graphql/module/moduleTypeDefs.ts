import gql from 'graphql-tag';

export const types = gql`
  type ModuleType {
    id: Int!
    name: String!
    isActive: Boolean!
    createdAt: Float!
    createdBy: Int
    updatedAt: Float
    updatedBy: Int
  }
`;
export const query = gql`
  type Query {
    moduleGetAll: [ModuleType]
  }
`;
export const Mutations = gql`
  type Mutation {
    moduleCreate(
      title: String!
      url: String!
      type: String!
      tags: String!
    ): Boolean
  }
`;
