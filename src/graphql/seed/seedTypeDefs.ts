import gql from 'graphql-tag';

export const types = gql`
  type Seed {
    id: ID!
    name: String!
    hasDone: Boolean!
    createdAt: Float!
  }
`;
export const query = gql`
  type Query {
    seedList: [Seed]
  }
`;
export const Mutations = gql`
  type Mutation {
    seedMake: Boolean
  }
`;
