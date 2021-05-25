"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaWithMiddleware = exports.schema = void 0;
const graphql_middleware_1 = require("graphql-middleware");
const graphql_tools_1 = require("graphql-tools");
const typeDefs_1 = __importDefault(require("./typeDefs"));
const resolvers_1 = __importDefault(require("./resolvers"));
const middlewares_1 = __importDefault(require("../middlewares"));
const schema = graphql_tools_1.makeExecutableSchema({ typeDefs: typeDefs_1.default, resolvers: resolvers_1.default });
exports.schema = schema;
const schemaWithMiddleware = graphql_middleware_1.applyMiddleware(schema, ...middlewares_1.default);
exports.schemaWithMiddleware = schemaWithMiddleware;
//# sourceMappingURL=schema.js.map