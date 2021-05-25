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
const node_fetch_1 = __importDefault(require("node-fetch"));
const createTOConnection_1 = require("../utils/createTOConnection");
const createVerifyEmailLink_1 = require("../utils/createVerifyEmailLink");
const User_1 = require("../entity/User");
const redisConfig_1 = require("../utils/redisConfig");
let userId;
let connection;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    connection = yield createTOConnection_1.createTOConnection();
    const user = User_1.User.create({ email: "asiaferrer@gmail.com", password: "jochy123" });
    yield user.save();
    userId = user.id;
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield connection.close();
}));
describe("ƒ: createVerifyEmailLink", () => {
    test("should create link, confirm user & delete key from redis", () => __awaiter(void 0, void 0, void 0, function* () {
        const url = yield createVerifyEmailLink_1.createVerifyEmailLink(process.env.TEST_HOST, userId, redisConfig_1.redis);
        const response = yield node_fetch_1.default(url);
        const text = yield response.text();
        expect(text).toEqual("ok");
        const user = yield User_1.User.findOne({ where: { id: userId } });
        expect(user.confirmed).toBeTruthy();
        const chunks = url.split("/");
        const key = chunks[chunks.length - 1];
        const value = yield redisConfig_1.redis.get(key);
        expect(value).toBeNull();
    }));
});
//# sourceMappingURL=createVerifyEmailLink.test.js.map