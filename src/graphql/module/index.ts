import { makeExecutableSchema } from "@graphql-tools/schema"
import {
    types,
    query,
    Mutations
} from './moduleTypeDefs'
import { mergeResolvers } from "@graphql-tools/merge";
import { moduleResolver } from "./moduleResolver";

export const moduleSchema = makeExecutableSchema({
    typeDefs: [
        types,
        query,
        Mutations
    ],
    resolvers: mergeResolvers([
        moduleResolver
    ])
});