import gql from 'graphql-tag';

export const types = gql`
  enum MenuType{
    SETTING
    LIST
  }
  type Menu {
    id: Int!
    name: String!
    slug: String!
    type: MenuType!
    order: Int!
    isActive: Boolean!
    createdAt: Float!
    createdBy: Int
    updatedAt: Float
    updatedBy: Int
  }
`;
export const query = gql`
  type Query {
    menuGetAll: [Menu]
    menuGetById(id: Int!): Menu
  }
`;
export const Mutations = gql`
  type Mutation {
    menuCreate(
      name: String!
      slug: String!
      type: MenuType!
    ): Boolean
    menuEdit(
      id: Int!
      name: String!
      slug: String!
      type: MenuType!
      order: Int
    ): Boolean
  }
`;
