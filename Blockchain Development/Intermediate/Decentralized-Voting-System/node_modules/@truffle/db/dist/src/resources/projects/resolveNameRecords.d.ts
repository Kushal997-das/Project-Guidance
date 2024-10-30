import type { SavedInput, IdObject, Workspace } from "../types";
export declare function resolveNameRecords(project: IdObject<"projects">, inputs: {
    name?: string;
    type?: string;
}, context: {
    workspace: Workspace;
}, _?: any): Promise<SavedInput<"nameRecords">[]>;
