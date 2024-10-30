import type { SavedInput, IdObject, Workspace } from "../types";
export declare const resolveAncestors: (network: IdObject<"networks">, options: any, { workspace }: {
    workspace: Workspace;
}) => Promise<SavedInput<"networks">[]>;
export declare const resolveDescendants: (network: IdObject<"networks">, options: any, { workspace }: {
    workspace: Workspace;
}) => Promise<SavedInput<"networks">[]>;
export declare function resolveRelations(relationship: "ancestor" | "descendant"): (network: IdObject<"networks">, options: any, { workspace }: {
    workspace: Workspace;
}) => Promise<SavedInput<"networks">[]>;
