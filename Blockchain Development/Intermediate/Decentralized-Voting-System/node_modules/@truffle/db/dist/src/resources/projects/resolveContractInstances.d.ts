import type * as graphql from "graphql";
import type { DataModel, IdObject, SavedInput, Workspace } from "../types";
/**
 * For given contract and/or network names, find all contract instances
 * matching either/both of those filters.
 *
 * Returns contract instances for the most current contract according to that
 * contract's name record history - i.e., if a contract has been revised since
 * being deployed to mainnet, this function will return the contract instance
 * for that past revision.
 */
export declare function resolveContractInstances(project: IdObject<"projects">, inputs: {
    contract?: DataModel.ResourceNameInput;
    address?: string;
    network?: DataModel.ResourceNameInput;
}, context: {
    workspace: Workspace;
}, info: graphql.GraphQLResolveInfo): Promise<SavedInput<"contractInstances">[]>;
