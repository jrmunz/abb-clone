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
let userId;
let connection;
const email = "asiaferrer@gmail.com";
const password = "jochy123";
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    connection = yield createTOConnection_1.createTOConnection();
    const user = User_1.User.create({ email, password, confirmed: true });
    yield user.save();
    userId = user.id;
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield connection.close();
}));
describe("User Query", () => {
    let testClient;
    beforeEach(() => {
        testClient = new TestClient_1.TestClient(process.env.TEST_GQL_HOST);
    });
    test("should return null when no cookie is preset", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield testClient.user();
        expect(response).toEqual({ user: null });
    }));
    test("should get current user", () => __awaiter(void 0, void 0, void 0, function* () {
        yield testClient.login(email, password);
        const response = yield testClient.user();
        expect(response).toEqual({
            user: {
                id: userId,
                email,
            },
        });
    }));
});
//# sourceMappingURL=User.test.js.map