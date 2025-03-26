import { makeExecutableSchema } from '@graphql-tools/schema'
import {
    types,
    query,
    Mutations
} from './categoryTypeDefs'
import { mergeResolvers } from '@graphql-tools/merge';
import { categoryResolver } from './categoryResolver';

export const categorySchema = makeExecutableSchema({
    typeDefs: [
        types,
        query,
        Mutations
    ],
    resolvers: mergeResolvers([
        categoryResolver
    ])
});