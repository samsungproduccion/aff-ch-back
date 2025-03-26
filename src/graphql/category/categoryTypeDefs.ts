import gql from 'graphql-tag';

export const types = gql`
  type Category {
    id: Int!
    name: String!
    slug: String!
    createdAt: Float!
    createdBy: Int
    products: [CategoryProduct]
  }
  type CategoryProduct {
    id: Int!
    sku: String!
    name: String!
    description: String
    image: String!
    url_page: String!
    url_shop: String
    price: Float!
    priceOld: Float
    moduleId: Int!
    isActive: Boolean!
    createdAt: Float!
    createdBy: Int!
    updatedAt: Float
    updatedBy: Int
    benefits: [CategoryProductBenefit]
  }
  type CategoryProductBenefit {
    id: ID!
    name: String!
    quantity: Float!
    type: String!
    productId: Int!
    startDate: Float!
    endDate: Float!
    createdAt: Float!
  }
`;
export const query = gql`
  type Query {
    categoryGetAll: [Category]
    categoryGetById(id: Int!): Category
  }
`;
export const Mutations = gql`
  type Mutation {
    categoryCreate(
      name: String!
      slug: String!
    ): Boolean

    categoryEdit(
      id: Int!
      name: String!
      slug: String!
    ): Boolean

    categoryAssigment (
      categories: [Int]!
      productId: Int!
    ): Boolean
  }
`;
