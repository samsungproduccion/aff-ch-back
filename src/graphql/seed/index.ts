import { makeExecutableSchema } from "@graphql-tools/schema"
import {
    types,
    query,
    Mutations
} from './seedTypeDefs'
import { mergeResolvers } from "@graphql-tools/merge";
import { seedResolver } from "./seedResolver";

export const seedSchema = makeExecutableSchema({
    typeDefs: [
        types,
        query,
        Mutations
    ],
    resolvers: mergeResolvers([
        seedResolver
    ])
});