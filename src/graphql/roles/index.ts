import { makeExecutableSchema } from '@graphql-tools/schema'
import {
    types,
    query,
    Mutations
} from './rolesTypeDefs'
import { mergeResolvers } from '@graphql-tools/merge';
import { rolesResolver } from './rolesResolver';

export const rolesSchema = makeExecutableSchema({
    typeDefs: [
        types,
        query,
        Mutations
    ],
    resolvers: mergeResolvers([
        rolesResolver
    ])
});