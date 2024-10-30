"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApolloServer = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const apollo_server_express_1 = require("apollo-server-express");
const url_1 = require("url");
const apollo_server_core_1 = require("apollo-server-core");
__exportStar(require("./exports"), exports);
class ApolloServer extends apollo_server_express_1.ApolloServer {
    constructor(config) {
        var _a;
        const httpServer = http_1.default.createServer();
        super({
            ...config,
            plugins: [
                ...((_a = config.plugins) !== null && _a !== void 0 ? _a : []),
                (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({
                    httpServer: httpServer,
                    stopGracePeriodMillis: config.stopGracePeriodMillis,
                }),
            ],
        });
        this.httpServer = httpServer;
        this.cors = config.cors;
        this.onHealthCheck = config.onHealthCheck;
        this.healthCheckPath = config === null || config === void 0 ? void 0 : config.healthCheckPath;
    }
    createServerInfo() {
        const addressInfo = this.httpServer.address();
        let hostForUrl = addressInfo.address;
        if (hostForUrl === '' || hostForUrl === '::') {
            hostForUrl = 'localhost';
        }
        const url = (0, url_1.format)({
            protocol: 'http',
            hostname: hostForUrl,
            port: addressInfo.port,
            pathname: this.graphqlPath,
        });
        return {
            ...addressInfo,
            server: this.httpServer,
            url,
        };
    }
    applyMiddleware() {
        throw new Error('To use Apollo Server with an existing express application, please use apollo-server-express');
    }
    async start() {
        throw new Error("When using the `apollo-server` package, you don't need to call start(); just call listen().");
    }
    async listen(...opts) {
        await this._start();
        const app = (0, express_1.default)();
        this.httpServer.on('request', app);
        app.disable('x-powered-by');
        super.applyMiddleware({
            app: app,
            path: '/',
            bodyParserConfig: { limit: '50mb' },
            onHealthCheck: this.onHealthCheck,
            cors: typeof this.cors !== 'undefined'
                ? this.cors
                : {
                    origin: '*',
                },
            __internal_healthCheckPath: this.healthCheckPath,
        });
        await new Promise((resolve) => {
            this.httpServer.once('listening', resolve);
            this.httpServer.listen(...(opts.length ? opts : [{ port: 4000 }]));
        });
        return this.createServerInfo();
    }
}
exports.ApolloServer = ApolloServer;
//# sourceMappingURL=index.js.map