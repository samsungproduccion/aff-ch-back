import { makeExecutableSchema } from "@graphql-tools/schema"
import {
    types,
    query,
    Mutations
} from './resurceTypeDefs'
import { mergeResolvers } from "@graphql-tools/merge";
import { resourceResolver } from "./resourceResolver";

export const resourceSchema = makeExecutableSchema({
    typeDefs: [
        types,
        query,
        Mutations
    ],
    resolvers: mergeResolvers([
        resourceResolver
    ])
});