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
const createTOConnection_1 = require("../utils/createTOConnection");
const TestClient_1 = require("../utils/TestClient");
const User_1 = require("../entity/User");
const email = "asiaferrer@gmail.com";
const password = "jochy123";
let userId;
let connection;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    connection = yield createTOConnection_1.createTOConnection();
    const user = yield User_1.User.create({ email, password, confirmed: true }).save();
    userId = user.id;
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield connection.close();
}));
describe("Logout User", () => {
    test("MULTIPLE SESSION:", () => __awaiter(void 0, void 0, void 0, function* () {
        const session1 = new TestClient_1.TestClient(process.env.TEST_GQL_HOST);
        const session2 = new TestClient_1.TestClient(process.env.TEST_GQL_HOST);
        yield session1.login(email, password);
        yield session2.login(email, password);
        expect(yield yield session1.user()).toEqual(yield yield yield session2.user());
    }));
    test("SINGLE SESSION: should destory session and log a user out", () => __awaiter(void 0, void 0, void 0, function* () {
        const testClient = new TestClient_1.TestClient(process.env.TEST_GQL_HOST);
        yield testClient.login(email, password);
        const loginResponse = yield testClient.user();
        expect(loginResponse).toEqual({
            user: {
                id: userId,
                email,
            },
        });
        yield testClient.logout();
        const logoutResponse = yield testClient.user();
        expect(logoutResponse).toEqual({ user: null });
    }));
});
//# sourceMappingURL=logout.test.js.map