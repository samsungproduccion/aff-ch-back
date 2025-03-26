import { makeExecutableSchema } from "@graphql-tools/schema"
import {
    types,
    query,
    Mutations
} from './benefitTypeDefs'
import { mergeResolvers } from "@graphql-tools/merge";
import { benefitResolver } from "./benefitResolver";

export const benefitSchema = makeExecutableSchema({
    typeDefs: [
        types,
        query,
        Mutations
    ],
    resolvers: mergeResolvers([
        benefitResolver
    ])
});