import { makeExecutableSchema } from "@graphql-tools/schema"
import {
    types,
    query,
    Mutations
} from './productTypeDefs'
import { mergeResolvers } from "@graphql-tools/merge";
import { productResolver } from "./productResolver";

export const productSchema = makeExecutableSchema({
    typeDefs: [
        types,
        query,
        Mutations
    ],
    resolvers: mergeResolvers([
        productResolver
    ])
});