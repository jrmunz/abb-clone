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
exports.removeAllUserSessions = void 0;
const constants_1 = require("../constants");
const removeAllUserSessions = (userId, redis) => __awaiter(void 0, void 0, void 0, function* () {
    const sessionIds = yield redis.lrange(`${constants_1.userSidsPrefix}${userId}`, 0, -1);
    const promises = [];
    for (let i = 0; i < sessionIds.length; i++) {
        promises.push(redis.del(`${sessionIds[i]}`));
    }
});
exports.removeAllUserSessions = removeAllUserSessions;
//# sourceMappingURL=removeAllUserSessions.js.map