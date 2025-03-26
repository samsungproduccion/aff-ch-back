import { makeExecutableSchema } from '@graphql-tools/schema'
import {
    types,
    query,
    Mutations
} from './menuTypeDefs'
import { mergeResolvers } from '@graphql-tools/merge';
import { menuResolver } from './menuResolver';

export const menuSchema = makeExecutableSchema({
    typeDefs: [
        types,
        query,
        Mutations
    ],
    resolvers: mergeResolvers([
        menuResolver
    ])
});