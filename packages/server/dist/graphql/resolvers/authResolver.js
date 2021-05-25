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
exports.authResolver = void 0;
const common_1 = require("@abb/common");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createVerifyEmailLink_1 = require("../../utils/createVerifyEmailLink");
const formatYupError_1 = require("../../utils/formatYupError");
const User_1 = require("../../entity/User");
const sendEmail_1 = require("../../utils/sendEmail");
const removeAllUserSessions_1 = require("../../utils/removeAllUserSessions");
const forgotPwdLockAcct_1 = require("../../utils/forgotPwdLockAcct");
const createForgotPwdLink_1 = require("../../utils/createForgotPwdLink");
const constants_1 = require("../../constants");
exports.authResolver = {
    Query: {
        user: (_, __, { req: { session } }) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { id: session.userId } });
            return user;
        }),
    },
    Mutation: {
        changeForgottenPassword: (_, { key, newPassword }, { redis }) => __awaiter(void 0, void 0, void 0, function* () {
            const redisKey = `${constants_1.forgotPwdPrefix}${key}`;
            const userId = yield redis.get(redisKey);
            if (!userId) {
                return [{ path: "key", message: common_1.messages.forgotPassword.expiredKey }];
            }
            try {
                yield common_1.newPasswordSchema.validate({ newPassword }, { abortEarly: false });
            }
            catch (err) {
                return formatYupError_1.formatYupError(err);
            }
            const hashedPassword = yield bcryptjs_1.default.hash(newPassword, 10);
            const updatePromise = yield User_1.User.update({ id: userId }, { forgotPasswordLocked: false, password: hashedPassword });
            const deleteKeyPromise = yield redis.del(redisKey);
            yield Promise.all([updatePromise, deleteKeyPromise]);
            return null;
        }),
        sendForgotPasswordEmail: (_, __, { redis, req }) => __awaiter(void 0, void 0, void 0, function* () {
            const { userId } = req.session;
            yield forgotPwdLockAcct_1.forgotPwdLockAcct(userId, redis);
            yield createForgotPwdLink_1.createForgotPasswordLink("", userId, redis);
            return null;
        }),
        logout: (_, __, { req: { session }, redis }) => __awaiter(void 0, void 0, void 0, function* () {
            const { userId } = session;
            if (userId) {
                yield removeAllUserSessions_1.removeAllUserSessions(userId, redis);
                return true;
            }
            return false;
        }),
        login: (_, { email, password }, { req, redis }) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { email } });
            if (!user) {
                return [{ path: "email", message: common_1.messages.login.invalidCridentials }];
            }
            if (!user.confirmed) {
                return [{ path: "email", message: common_1.messages.login.confirmBtn }];
            }
            if (user.forgotPasswordLocked) {
                return [{ path: "email", message: common_1.messages.login.AcctLock }];
            }
            const isMatch = yield bcryptjs_1.default.compare(password, user.password);
            if (!isMatch) {
                return [{ path: "email", message: common_1.messages.login.invalidCridentials }];
            }
            req.session.userId = user.id;
            yield redis.lpush(`${constants_1.userSidsPrefix}${user.id}`, `${constants_1.redisPrefix}${req.sessionID}`);
            return null;
        }),
        register: (_, args, { redis, url }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield common_1.validUserSchema.validate(args, { abortEarly: false });
            }
            catch (err) {
                return formatYupError_1.formatYupError(err);
            }
            const { email, password } = args;
            const userAlreadyExists = yield User_1.User.findOne({ where: { email }, select: ["id"] });
            if (userAlreadyExists) {
                return [{ path: "email", message: common_1.messages.register.duplicateEmail }];
            }
            const user = User_1.User.create({ email, password });
            yield user.save();
            if (process.env.NODE_ENV !== "test") {
                yield sendEmail_1.sendConfirmationEmail(user.email, yield createVerifyEmailLink_1.createVerifyEmailLink(url, user.id, redis));
            }
            return null;
        }),
    },
};
//# sourceMappingURL=authResolver.js.map