"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const rootResolver_1 = require("./rootResolver");
const authResolver_1 = require("./authResolver");
exports.default = graphql_tools_1.mergeResolvers([authResolver_1.authResolver, rootResolver_1.rootResolver]);
//# sourceMappingURL=index.js.map