"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authType = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.authType = apollo_server_express_1.gql `
  type User {
    id: ID!
    email: String!
  }

  type Query {
    user: User
  }

  type Mutation {
    changeForgottenPassword(newPassword: String!, key: String!): [Error!]
    logout: Boolean
    login(email: String!, password: String!): [Error!]
    register(email: String!, password: String!): [Error!]
    sendForgotPasswordEmail(email: String!): Boolean
  }
`;
//# sourceMappingURL=authType.js.map