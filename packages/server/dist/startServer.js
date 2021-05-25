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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
require("reflect-metadata");
require("dotenv/config");
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const createTOConnection_1 = require("./utils/createTOConnection");
const schema_1 = require("./graphql/schema");
const constants_1 = require("./constants");
const redisConfig_1 = require("./utils/redisConfig");
const rest_1 = __importDefault(require("./routes/rest"));
const RedisStore = connect_redis_1.default(express_session_1.default);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = new apollo_server_express_1.ApolloServer({
        schema: schema_1.schemaWithMiddleware,
        context: ({ req }) => ({
            req: req,
            redis: redisConfig_1.redis,
            url: req.protocol + "://" + req.get("host"),
        }),
        playground: true,
    });
    const connection = yield createTOConnection_1.createTOConnection();
    yield server.start();
    const app = express_1.default();
    const cors = {
        credentials: true,
        origin: process.env.NODE_ENV === "test" ? "*" : process.env.CLIENT_HOST,
    };
    app.use(express_session_1.default({
        store: new RedisStore({ client: redisConfig_1.redis, prefix: constants_1.redisPrefix }),
        name: "qid",
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 7,
        },
    }));
    app.use("/", rest_1.default);
    server.applyMiddleware({ app, cors });
    const listener = app.listen({ port: process.env.PORT || 4000 }, () => {
        console.log(`🚀  Server ready at http://localhost:4000${server.graphqlPath}`);
    });
    return { connection, listener };
});
exports.startServer = startServer;
//# sourceMappingURL=startServer.js.map