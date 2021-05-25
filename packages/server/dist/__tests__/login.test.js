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
const common_1 = require("@abb/common");
const createTOConnection_1 = require("../utils/createTOConnection");
const TestClient_1 = require("../utils/TestClient");
const User_1 = require("../entity/User");
let connection;
const email = "jochy07c@gmail.com";
const password = "test123!";
const loginError = (testClient, email, password, errorMsg) => __awaiter(void 0, void 0, void 0, function* () {
    const loginUser = yield testClient.login(email, password);
    expect(loginUser).toEqual({
        login: [{ path: "email", message: errorMsg }],
    });
});
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    connection = yield createTOConnection_1.createTOConnection();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield connection.close();
}));
describe("Login User", () => {
    let testClient;
    beforeEach(() => {
        testClient = new TestClient_1.TestClient(process.env.TEST_GQL_HOST);
    });
    test("should return invalid credentials, no user", () => __awaiter(void 0, void 0, void 0, function* () {
        yield loginError(testClient, email, password, common_1.messages.login.invalidCridentials);
    }));
    test("should fail login user, email not confirmed + update user + login successful", () => __awaiter(void 0, void 0, void 0, function* () {
        yield testClient.register(email, password);
        yield loginError(testClient, email, password, common_1.messages.login.confirmBtn);
        yield User_1.User.update({ email }, { confirmed: true });
        yield loginError(testClient, email, "asdasdasd", common_1.messages.login.invalidCridentials);
        const loginSuccess = yield testClient.login(email, password);
        expect(loginSuccess).toEqual({ login: null });
    }));
});
//# sourceMappingURL=login.test.js.map