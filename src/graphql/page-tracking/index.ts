import { makeExecutableSchema } from "@graphql-tools/schema"
import {
    types,
    query,
    Mutations
} from './pageTrackinggTypeDefs'
import { mergeResolvers } from "@graphql-tools/merge";
import { pageTrackingResolver } from "./pageTrackingResolver";

export const pageTrackingSchema = makeExecutableSchema({
    typeDefs: [
        types,
        query,
        Mutations
    ],
    resolvers: mergeResolvers([
        pageTrackingResolver
    ])
});