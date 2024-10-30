export { generateId } from "../system";
export declare const fixturesDirectory: string;
export declare class WorkspaceClient {
    private workspace;
    constructor();
    execute(request: any, variables?: {}): Promise<{
        [key: string]: any;
    } | null | undefined>;
}
export declare const Migrations: any;
