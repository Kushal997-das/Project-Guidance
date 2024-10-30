import type { Collections, CollectionName, SavedInput } from "../collections";
import type { IdObject } from "./types";
export { GenerateId, SpecificGenerateId, IdObject, StrictIdInput } from "./types";
export { Definition, Definitions } from "./definitions";
export { forDefinitions } from "./generateId";
export declare const toIdObject: <C extends Collections, N extends CollectionName<C>, R extends import("../collections").CollectionProperty<"resource", C, N> | SavedInput<C, N>, I extends Pick<R, "id"> | null | undefined = Pick<R, "id"> | null | undefined>(resource: I) => Pick<R, "id"> extends I ? IdObject<C, N, R> : IdObject<C, N, R> | undefined;
