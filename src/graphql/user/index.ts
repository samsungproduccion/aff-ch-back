import { makeExecutableSchema } from "@graphql-tools/schema"
import {
    types,
    query,
    Mutations
} from './userTypeDefs'
import { mergeResolvers } from "@graphql-tools/merge";
import { UserResolver } from "./userResolver";

export const userSchema = makeExecutableSchema({
    typeDefs: [
        types,
        query,
        Mutations
    ],
    resolvers: mergeResolvers([
        UserResolver
    ])
});