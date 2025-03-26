import gql from 'graphql-tag';

export const types = gql`
  type Resource {
    id: ID!
    title: String!
    url: String!
    type: String!
    tags: String!
    isActive: Boolean!
    createdAt: Float!
  }
`;
export const query = gql`
  type Query {
    resourcesGetAll: [Resource]
    resourcesGet(id: ID!): Resource
  }
`;
export const Mutations = gql`
  type Mutation {
    resourcesCreate(
      title: String!
      url: String!
      type: String!
      tags: String!
    ): Boolean
    resourcesDelete(
      id: Int!
    ): Boolean
  }
`;
