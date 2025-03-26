import gql from 'graphql-tag';

export const types = gql`
  type Benefit {
    id: ID!
    name: String!
    isActive: Boolean!
  }
`;
export const query = gql`
  type Query {
    benefitGetAll: [Benefit]
    benefitGetActive: [Benefit]
  }
`;
export const Mutations = gql`
  type Mutation {
    benefitCreate(name: String!): Boolean
    benefitDelete(id: Int!): Boolean
    benefitChangeStatus(id: Int!, status:Boolean): Boolean
  }
`;
