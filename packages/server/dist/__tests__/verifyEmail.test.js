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
describe("Confirm Email", () => {
    test("should return 'invalid' because of bad/expired id param being sent", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield node_fetch_1.default(`${process.env.TEST_HOST}/confirm/123u12413`);
        const text = yield response.text();
        expect(text).toEqual("invalid");
    }));
});
//# sourceMappingURL=verifyEmail.test.js.map