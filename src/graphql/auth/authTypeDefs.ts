import gql from 'graphql-tag';

export const types = gql`
  enum UserRole {
    USER
    ADMIN
    ROOT
  }

  enum UserStatus {
    P
    A
    R
  }

  type User {
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
    role: UserRole!
    status: UserStatus!
    approval: Int!
    moduleId: Int!
    isActive: Boolean!
    createdAt: Float!
  }
  type Role {
    id: ID!
    name: String!
    slug: String!
    menus: String!
  }
  type UserWithRole {
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
    productCategory: String!
    facebook: String
    instagram: String
    tiktok: String
    website: String
    image: String
    code: String
    role: UserRole!
    status: UserStatus!
    approval: Int!
    moduleId: Int!
    isActive: Boolean!
    createdAt: Float!
    roles: Role!
  }
  type Token {
    value: String
  }
  type ResetPassword {
    id: ID!
    email: String!
    token: String!
    createdAt: Float!
    status: Boolean!
  }
  type LoginResponse {
    token: String!
    approval: Int!
    expired: Boolean!
    mfa: Boolean!
  }
  type LoginMfaResponse {
    token: String!
    approval: Int!
  }
`;
export const query = gql`
  type Query {
    authGetUsers: [User]
    authGetUser: User
  }
`;
export const Mutations = gql`
  type Mutation {
    authLogin(email: String!, password: String!): LoginResponse
    authMfaEmailValidate(code: String!, token: String!): LoginMfaResponse
    isloged(token: String!): UserWithRole
    authRestorePassword(email: String!): ResetPassword
    authVerifyRestoreJWT(token: String!): ResetPassword
    authResetPassword(
      newPassword: String!
      repeatPassword: String!
      token: String!
      email: String!
    ): User
    authRenewPassword(
      oldPassword: String!
      newPassword: String!
      repeatPassword: String!
      token: String!
    ): LoginResponse
  }
`;
