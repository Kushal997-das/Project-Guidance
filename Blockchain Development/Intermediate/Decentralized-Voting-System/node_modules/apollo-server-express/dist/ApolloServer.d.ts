import express from 'express';
import corsMiddleware from 'cors';
import { OptionsJson } from 'body-parser';
import { GraphQLOptions, ApolloServerBase, Config } from 'apollo-server-core';
export { GraphQLOptions } from 'apollo-server-core';
export interface GetMiddlewareOptions {
    path?: string;
    cors?: corsMiddleware.CorsOptions | corsMiddleware.CorsOptionsDelegate | boolean;
    bodyParserConfig?: OptionsJson | boolean;
    onHealthCheck?: (req: express.Request) => Promise<any>;
    disableHealthCheck?: boolean;
    __internal_healthCheckPath?: string | null;
}
export interface ServerRegistration extends GetMiddlewareOptions {
    app: express.Application;
}
export interface ExpressContext {
    req: express.Request;
    res: express.Response;
}
export declare type ApolloServerExpressConfig = Config<ExpressContext>;
export declare class ApolloServer<ContextFunctionParams = ExpressContext> extends ApolloServerBase<ContextFunctionParams> {
    createGraphQLServerOptions(req: express.Request, res: express.Response): Promise<GraphQLOptions>;
    applyMiddleware({ app, ...rest }: ServerRegistration): void;
    getMiddleware({ path, cors, bodyParserConfig, disableHealthCheck, onHealthCheck, __internal_healthCheckPath, }?: GetMiddlewareOptions): express.Router;
}
//# sourceMappingURL=ApolloServer.d.ts.map