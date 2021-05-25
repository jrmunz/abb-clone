"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootResolver = void 0;
exports.rootResolver = {
    Query: {
        hello: (_, { name }) => `Hello ${name || "Universe"}`,
    },
};
//# sourceMappingURL=rootResolver.js.map