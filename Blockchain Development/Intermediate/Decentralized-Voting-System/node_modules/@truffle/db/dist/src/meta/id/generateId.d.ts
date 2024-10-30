import type { Collections } from "../collections";
import type { GenerateId } from "./types";
import type { Definitions } from "./definitions";
export declare const forDefinitions: <C extends Collections>(definitions: Definitions<C>) => GenerateId<C>;
