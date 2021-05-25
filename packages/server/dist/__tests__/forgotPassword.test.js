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
const createForgotPwdLink_1 = require("../utils/createForgotPwdLink");
const createTOConnection_1 = require("../utils/createTOConnection");
const forgotPwdLockAcct_1 = require("../utils/forgotPwdLockAcct");
const redisConfig_1 = require("../utils/redisConfig");
const TestClient_1 = require("../utils/TestClient");
const User_1 = require("../entity/User");
const email = "asiaferrer@gmail.com";
const password = "jochy123";
const newPassword = "newJochy123";
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
describe("Forgot Password", () => {
    test("should update user account w/ new password", () => __awaiter(void 0, void 0, void 0, function* () {
        const testClient = new TestClient_1.TestClient(process.env.TEST_GQL_HOST);
        yield forgotPwdLockAcct_1.forgotPwdLockAcct(userId, redisConfig_1.redis);
        const lockAcctLoginAttempt = yield testClient.login(email, password);
        expect(lockAcctLoginAttempt).toEqual({
            login: [{ path: "email", message: common_1.messages.login.AcctLock }],
        });
        const url = yield createForgotPwdLink_1.createForgotPasswordLink(process.env.TEST_HOST, userId, redisConfig_1.redis);
        const chunks = url.split("/");
        const key = chunks[chunks.length - 1];
        const changePwdShortFail = yield testClient.changeForgottenPassword("p", key);
        expect(changePwdShortFail).toEqual({
            changeForgottenPassword: [
                { path: "newPassword", message: common_1.messages.register.passwordNotLongEnough },
            ],
        });
        const changePwdResponse = yield testClient.changeForgottenPassword(newPassword, key);
        expect(changePwdResponse).toEqual({ changeForgottenPassword: null });
        const sameKeyChangePwd = yield testClient.changeForgottenPassword("againagainagain", key);
        expect(sameKeyChangePwd).toEqual({
            changeForgottenPassword: [{ path: "key", message: common_1.messages.forgotPassword.expiredKey }],
        });
        const loginResponse = yield testClient.login(email, newPassword);
        expect(loginResponse).toEqual({ login: null });
        const userResponse = yield testClient.user();
        expect(userResponse).toEqual({ user: { id: userId, email } });
    }));
});
//# sourceMappingURL=forgotPassword.test.js.map