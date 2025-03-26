import gql from 'graphql-tag';

export const types = gql`
  type UserTracked {
    id: ID!
    name: String!
    lastName: String!
    email: String!
    password: String!
    phone: String!
    dni: String!
    country: String
    address1: String!
    address2: String
    image: String
    code: String
    approval: Int!
    isActive: Boolean!
    moduleId: Int!
    createdAt: Float!
    updatedAt: Float
  }

  type PageTracking {
    id: ID!
    page: String!
    parameters: String!
    idUser: Int
    createdAt: Float
  }

  type PageTrackingUser {
    id: ID!
    page: String!
    parameters: String!
    idUser: Int
    createdAt: Float
    utm_source: String
    utm_medium: String
    utm_content: String
    Users: UserTracked
  }

`;
export const query = gql`
  type Query {
    pageTrackingGetAll: [PageTracking]
    pageTrackingGet(id: ID!): PageTracking
    pageTrackingAndUserGetAll: [PageTrackingUser]
    pageTrackingAndUserGet(id: ID!): PageTrackingUser
  }
`;
export const Mutations = gql`
  type Mutation {
    pageTrackingCreate(
      page: String!
      parameters: String!
    ): Boolean
  }
`;
