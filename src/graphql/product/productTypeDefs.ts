import gql from 'graphql-tag';

export const types = gql`
  enum BenefitType{
    AMOUNT
    PERCENTAGE
  }
  type BenefitItem {
    id: ID!
    name: String!
    quantity: Float!
    type: BenefitType!
    productId: Int!
    startDate: Float!
    endDate: Float!
    createdAt: Float!
  }
  type ProductCategory {
    id: Int!
    name: String!
    slug: String!
    createdAt: Float!
    createdBy: Int
  }
  type Product {
    id: ID!
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
    benefits: [BenefitItem]
    categories: [ProductCategory]
  }
  input CreateBenefits {
    name: String!
    quantity: Float!
    type: BenefitType!
  }
  input EditProductBenefit {
    name: String!
    quantity: Int!
    type: BenefitType
  }
  input ICreateProduct {
    sku: String!
    name: String!
    description: String
    image: String!
    url_page: String!
    url_shop: String
    price: Float!
    priceOld: Float
  }
`;
export const query = gql`
  type Query {
    productGetAll: [Product]
    productGet(id: ID!): Product
  }
`;
export const Mutations = gql`
  type Mutation {
    productCreate(
      sku: String!
      name: String!
      description: String
      image: String!
      url_page: String!
      url_shop: String
      price: Float!
      priceOld: Float
      moduleId: Int!
      benefits: [CreateBenefits]
      categories: [Int]
    ): Boolean

    productCreateMany(
      products: [ICreateProduct]
    ): Boolean

    productEdit(
      id: ID!
      sku: String!
      name: String!
      isActive: Boolean!
      description: String
      image: String!
      url_page: String!
      url_shop: String
      price: Float!
      priceOld: Float!
      benefits: [EditProductBenefit]
      categories: [Int]
    ): Boolean

    productChangeImage(id: ID!, image: String!): Boolean
    productDelete(id:Int!): Boolean
  }
`;
