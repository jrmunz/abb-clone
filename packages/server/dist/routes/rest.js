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
const express_1 = require("express");
const User_1 = require("../entity/User");
const redisConfig_1 = require("../utils/redisConfig");
const router = express_1.Router();
router.get("/confirm/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = yield redisConfig_1.redis.get(id);
    if (userId) {
        yield User_1.User.update({ id: userId }, { confirmed: true });
        yield redisConfig_1.redis.del(id);
        res.send("ok");
    }
    else {
        res.send("invalid");
    }
}));
exports.default = router;
//# sourceMappingURL=rest.js.map