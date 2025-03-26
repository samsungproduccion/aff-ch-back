import { makeExecutableSchema } from "@graphql-tools/schema"
import {
    types,
    query,
    Mutations
} from './authTypeDefs'
import { mergeResolvers } from "@graphql-tools/merge";
import { AuthResolver } from "./authResolver";

export const authSchema = makeExecutableSchema({
    typeDefs: [
        types,
        query,
        Mutations
    ],
    resolvers: mergeResolvers([
        AuthResolver
    ])
});