import gql from 'graphql-tag';

export const types = gql`
  type RolMenuType{
    id: Int!,
    name: String!,
    slug: String!,
    isActive: Boolean,
    type: String!,
  }
  type RolType {
    id: Int!
    name: String!
    slug: String!
    menus: [RolMenuType]
  }
`;
export const query = gql`
  type Query {
    rolGetAll: [RolType]
    rolGetById(id: Int!): RolType
  }
`;
export const Mutations = gql`
  type Mutation {
    rolCreate(
      name: String!
      slug: String!
    ): Boolean

    rolMenuAssigment(
      menus: [Int]!
      roleId: Int!
    ):Boolean
  }
`;
