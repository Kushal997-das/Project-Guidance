/// <reference types="node" />
import express from 'express';
import http from 'http';
import { ApolloServer as ApolloServerExpress, CorsOptions, ApolloServerExpressConfig } from 'apollo-server-express';
export * from './exports';
export interface ServerInfo {
    address: string;
    family: string;
    url: string;
    port: number | string;
    server: http.Server;
}
export declare class ApolloServer extends ApolloServerExpress {
    private cors;
    private onHealthCheck;
    private healthCheckPath;
    private httpServer;
    constructor(config: ApolloServerExpressConfig & {
        cors?: CorsOptions | boolean;
        onHealthCheck?: (req: express.Request) => Promise<any>;
        healthCheckPath?: string | null;
        stopGracePeriodMillis?: number;
    });
    private createServerInfo;
    applyMiddleware(): void;
    start(): Promise<void>;
    listen(...opts: Array<any>): Promise<ServerInfo>;
}
//# sourceMappingURL=index.d.ts.map