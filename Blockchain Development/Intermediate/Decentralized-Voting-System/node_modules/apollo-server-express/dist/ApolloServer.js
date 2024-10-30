"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApolloServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const apollo_server_core_1 = require("apollo-server-core");
const accepts_1 = __importDefault(require("accepts"));
var apollo_server_core_2 = require("apollo-server-core");
class ApolloServer extends apollo_server_core_1.ApolloServerBase {
    async createGraphQLServerOptions(req, res) {
        const contextParams = { req, res };
        return super.graphQLServerOptions(contextParams);
    }
    applyMiddleware({ app, ...rest }) {
        this.assertStarted('applyMiddleware');
        app.use(this.getMiddleware(rest));
    }
    getMiddleware({ path, cors, bodyParserConfig, disableHealthCheck, onHealthCheck, __internal_healthCheckPath, } = {}) {
        if (!path)
            path = '/graphql';
        this.assertStarted('getMiddleware');
        const router = express_1.default.Router();
        if (!disableHealthCheck && __internal_healthCheckPath !== null) {
            router.use(__internal_healthCheckPath !== null && __internal_healthCheckPath !== void 0 ? __internal_healthCheckPath : '/.well-known/apollo/server-health', (req, res) => {
                res.type('application/health+json');
                if (onHealthCheck) {
                    onHealthCheck(req)
                        .then(() => {
                        res.json({ status: 'pass' });
                    })
                        .catch(() => {
                        res.status(503).json({ status: 'fail' });
                    });
                }
                else {
                    res.json({ status: 'pass' });
                }
            });
        }
        this.graphqlPath = path;
        if (cors === true) {
            router.use(path, (0, cors_1.default)());
        }
        else if (cors !== false) {
            router.use(path, (0, cors_1.default)(cors));
        }
        if (bodyParserConfig === true) {
            router.use(path, (0, body_parser_1.json)());
        }
        else if (bodyParserConfig !== false) {
            router.use(path, (0, body_parser_1.json)(bodyParserConfig));
        }
        const landingPage = this.getLandingPage();
        router.use(path, (req, res, next) => {
            if (landingPage && prefersHtml(req)) {
                res.setHeader('Content-Type', 'text/html');
                res.write(landingPage.html);
                res.end();
                return;
            }
            if (!req.body) {
                res.status(500);
                if (bodyParserConfig === false) {
                    res.send('`res.body` is not set; you passed `bodyParserConfig: false`, ' +
                        'but you still need to use `body-parser` middleware yourself.');
                }
                else {
                    res.send('`res.body` is not set even though Apollo Server installed ' +
                        "`body-parser` middleware; this shouldn't happen!");
                }
                return;
            }
            (0, apollo_server_core_1.runHttpQuery)([], {
                method: req.method,
                options: () => this.createGraphQLServerOptions(req, res),
                query: req.method === 'POST' ? req.body : req.query,
                request: (0, apollo_server_core_1.convertNodeHttpToRequest)(req),
            }, this.csrfPreventionRequestHeaders).then(({ graphqlResponse, responseInit }) => {
                if (responseInit.headers) {
                    for (const [name, value] of Object.entries(responseInit.headers)) {
                        res.setHeader(name, value);
                    }
                }
                res.statusCode = responseInit.status || 200;
                if (typeof res.send === 'function') {
                    res.send(graphqlResponse);
                }
                else {
                    res.end(graphqlResponse);
                }
            }, (error) => {
                if (!(0, apollo_server_core_1.isHttpQueryError)(error)) {
                    return next(error);
                }
                if (error.headers) {
                    for (const [name, value] of Object.entries(error.headers)) {
                        res.setHeader(name, value);
                    }
                }
                res.statusCode = error.statusCode;
                if (typeof res.send === 'function') {
                    res.send(error.message);
                }
                else {
                    res.end(error.message);
                }
            });
        });
        return router;
    }
}
exports.ApolloServer = ApolloServer;
function prefersHtml(req) {
    if (req.method !== 'GET') {
        return false;
    }
    const accept = (0, accepts_1.default)(req);
    const types = accept.types();
    return (types.find((x) => x === 'text/html' || x === 'application/json') ===
        'text/html');
}
//# sourceMappingURL=ApolloServer.js.map