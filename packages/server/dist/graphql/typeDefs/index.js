"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const rootType_1 = require("./rootType");
const authType_1 = require("./authType");
exports.default = graphql_tools_1.mergeTypeDefs([authType_1.authType, rootType_1.rootType]);
//# sourceMappingURL=index.js.map