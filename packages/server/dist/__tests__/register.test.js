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
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    connection = yield createTOConnection_1.createTOConnection();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield connection.close();
}));
describe("Register User", () => {
    let testClient;
    beforeEach(() => {
        testClient = new TestClient_1.TestClient(process.env.TEST_GQL_HOST);
    });
    test("check for duplicate emails", () => __awaiter(void 0, void 0, void 0, function* () {
        const newRegister = yield testClient.register(email, password);
        expect(newRegister).toEqual({ register: null });
        const users = yield User_1.User.find({ where: { email } });
        expect(users).toHaveLength(1);
        const user = users[0];
        expect(user.email).toEqual(email);
        expect(user.password).not.toEqual(password);
        const duplicateEmail = yield testClient.register(email, password);
        expect(duplicateEmail.register).toHaveLength(1);
        expect(duplicateEmail.register[0]).toEqual({
            path: "email",
            message: common_1.messages.register.duplicateEmail,
        });
    }));
    test("check for bad email", () => __awaiter(void 0, void 0, void 0, function* () {
        const badEmail = yield testClient.register("om", password);
        expect(badEmail.register).toEqual([
            {
                path: "email",
                message: common_1.messages.register.emailNotLongEnough,
            },
            {
                path: "email",
                message: common_1.messages.register.invalidEmail,
            },
        ]);
    }));
    test("check for bad password", () => __awaiter(void 0, void 0, void 0, function* () {
        const badPassword = yield testClient.register(email, "te");
        expect(badPassword.register).toEqual([
            {
                path: "password",
                message: common_1.messages.register.passwordNotLongEnough,
            },
        ]);
    }));
    test("check for bad email+password", () => __awaiter(void 0, void 0, void 0, function* () {
        const badEmailPassword = yield testClient.register("cm", "te");
        expect(badEmailPassword.register).toEqual([
            {
                path: "email",
                message: common_1.messages.register.emailNotLongEnough,
            },
            {
                path: "email",
                message: common_1.messages.register.invalidEmail,
            },
            {
                path: "password",
                message: common_1.messages.register.passwordNotLongEnough,
            },
        ]);
    }));
});
//# sourceMappingURL=register.test.js.map