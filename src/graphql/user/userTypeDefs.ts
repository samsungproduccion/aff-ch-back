import gql from 'graphql-tag';

export const types = gql`
  enum UserRole {
    USER
    ADMIN
    ROOT
  }

  enum UserStatus {
    R
    P
    O
    PA
    C
    A
    M
  }

  type Module{
    id: Int!
    name: String!
    isActive: Boolean!
    createdAt: Float
    updatedAt: Float
    createdBy: Int
    updatedBy: Int
  }

  type UserInfo {
    id: ID!
    userId: ID!
    rucNumber: String
    bankNumber: String
    rucDoc: String
    bankDoc: String
    dniDoc: String
    validityCert: String
    comment: String
    contract: String
    checkInfo: Boolean
    checkTerms: Boolean!
    checkPrivacy: Boolean!
  }

  type Representative {
    id: ID!
    userId: ID!
    name: String
    lastName: String
    email: String
    phone: String
    dni: String
    rucNumber: String
    bankNumber: String
    dniDoc: String
    rucDoc: String
    bankDoc: String
    validityCert: String
    contract: String
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
    isActive: Boolean!
    isObserved: Boolean!
    isSpecial: Boolean!
    moduleId: Int!
    createdAt: Float!
    updatedAt: Float
    userInfo: UserInfo
    representative: Representative
    menus: [UserMenu]
    module: Module
    roles: Rol
  }

  type Rol {
    id: ID!
    name: String!
    slug: String!
    menus: String!
  }

  type UserMenu{
    id: Int!
    name: String!
    slug: String!
    type: String!
    order: Int!
    isActive: Boolean!
    createdAt: Float!
    createdBy: Int
    updatedAt: Float
    updatedBy: Int
  }

  type Token {
    value: String
  }
  input IApprovedUser{
    name: String!
    lastName: String!
    email: String!
    password: String!
    phone: String!
    image: String
    dni: String!
    country: String
    code: String!
    address1: String!
    address2: String
    moduleId: Int!
  }
  input IEditUser {
    name: String!
    lastName: String!
    email: String!
    image: String
    phone: String!
    dni: String!
    country: String
    address1: String!
    address2: String
  }
  input IAditionalInfo{
    rucNumber: String!
    bankNumber: String!
    dniDoc: String
    rucDoc: String
    bankDoc: String
    validityCert: String
    contract: String
  }
  input IRepresentative{
    name: String!
    lastName: String!
    email: String!
    phone: String!
    dni: String!
    rucNumber: String!
    bankNumber: String!
    dniDoc: String!
    rucDoc: String!
    bankDoc: String!
    validityCert: String
    contract: String
  }
  input IRepresentativeAp{
    name: String!
    lastName: String!
    email: String!
    phone: String!
    dni: String!
    rucNumber: String!
    bankNumber: String!
    dniDoc: String
    rucDoc: String
    bankDoc: String
    validityCert: String
    contract: String
  }
  enum TypeUserRep {
    USER
    REPRESENTATIVE
  }
`;
export const query = gql`
  type Query {
    userGetAll: [User]
    userGetAllCategories: [User]
    userGetAllAdmin: [User]
    userGetAllByStatus(approval: [Int]!): [User]
    userGetSelected(quantity: Int!): [User]
    userGet: User
    userGetById(id: ID!): User
    userGetMenus: [String]
    userGetRoles: [Rol]
  }
`;
export const Mutations = gql`
  type Mutation {
    userChangeImage(image: String!): User
    userChangeDniDoc(image: String!, type: TypeUserRep): Boolean
    userChangeBankDoc(image: String!, type: TypeUserRep): Boolean
    userChangeRucDoc(image: String!, type: TypeUserRep): Boolean
    userChangeCertDoc(image: String!, type: TypeUserRep): Boolean
    userChangeContractDoc(image: String!, type: TypeUserRep): Boolean
    userChangePassword(
      currentPassword: String!
      newPassword: String!
      confirmPassword: String!
    ): Boolean

    userCreate(
      name: String!
      lastName: String!
      email: String!
      password: String!
      image: String
      phone: String!
      dni: String!
      country: String
      address1: String!
      address2: String
      checkTerms: Boolean!
      checkPrivacy: Boolean!
    ): User

    userRegister(
      name: String!
      lastName: String!
      email: String!
      password: String!
      image: String
      phone: String!
      dni: String!
      country: String
      address1: String!
      address2: String
      page: String!
      parameters: String!
      checkTerms: Boolean!
      checkPrivacy: Boolean!
    ): Boolean

    userCreateApproved(
      user: IApprovedUser!
      info: IAditionalInfo!
      representative: IRepresentativeAp
    ): Boolean

    userCreateSuper(
      name: String!
      lastName: String!
      email: String!
      phone: String!
      dni: String!
      rolId: Int!
      moduleId: Int!
    ): Boolean

    userEdit(
      user: IEditUser!
      info: IAditionalInfo!
      representative: IRepresentative
    ): User

    userDelete(
      idUser: Int!
    ): Boolean

    userChangeApproval(idUser: ID!): User
    userChangeStatus(id: ID!, approval: Int!, status: UserStatus!, comment: String, isSpecial: Boolean!): Boolean
    userAssignSpecialCode(id: Int!, code: String!, status: UserStatus!): Boolean
    userToggleActive(id: ID!, status: Boolean!): Boolean
    userEditCode(idUser: Int!, code: String!): Boolean
    userPreApprove(id: Int!, approval: Int!, status: UserStatus!, isSpecial: Boolean!): Boolean
    userPreApproveComplete(id: Int!, approval: Int!): Boolean
    userObserved(id: Int!, comment: String!, isObserved: Boolean!): Boolean
  }
`;
