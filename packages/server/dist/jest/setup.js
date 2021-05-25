"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeSetup = exports.initializeSetup = void 0;
const startServer_1 = require("../startServer");
let server;
let TOConnection;
const initializeSetup = () => __awaiter(void 0, void 0, void 0, function* () {
    const { connection, listener } = yield startServer_1.startServer();
    const { port } = listener.address();
    server = listener;
    TOConnection = connection;
    process.env.TEST_GQL_HOST = `http://127.0.0.1:${port}/graphql`;
    process.env.TEST_HOST = `http://127.0.0.1:${port}`;
});
exports.initializeSetup = initializeSetup;
const closeSetup = () => __awaiter(void 0, void 0, void 0, function* () {
    server.close();
    yield TOConnection.close();
});
exports.closeSetup = closeSetup;
//# sourceMappingURL=setup.js.map