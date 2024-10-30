import type * as graphql from "graphql";
import type { Collections } from "../collections";
import type { Definitions } from "./types";
export declare const forDefinitions: <C extends Collections>(definitions: Definitions<C>) => graphql.GraphQLSchema;
