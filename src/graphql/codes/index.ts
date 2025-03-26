import { makeExecutableSchema } from "@graphql-tools/schema"
import {
    types,
    query,
    Mutations
} from './codeTypeDefs'
import { mergeResolvers } from "@graphql-tools/merge";
import { codeResolver } from "./codeResolver";

export const codesSchema = makeExecutableSchema({
    typeDefs: [
        types,
        query,
        Mutations
    ],
    resolvers: mergeResolvers([
        codeResolver
    ])
});