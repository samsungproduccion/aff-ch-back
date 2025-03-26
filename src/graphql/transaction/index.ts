import { makeExecutableSchema } from "@graphql-tools/schema"
import {
    types,
    query,
    Mutations
} from './transactionTypeDefs'
import { mergeResolvers } from "@graphql-tools/merge";
import { transactionResolver } from './transactionResolver';

export const transactionSchema = makeExecutableSchema({
    typeDefs: [
        types,
        query,
        Mutations
    ],
    resolvers: mergeResolvers([
        transactionResolver
    ])
});