"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootType = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.rootType = apollo_server_express_1.gql `
  type Error {
    path: String!
    message: String!
  }

  type Query {
    hello(name: String): String!
  }
`;
//# sourceMappingURL=rootType.js.map