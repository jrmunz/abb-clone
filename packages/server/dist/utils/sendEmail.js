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
exports.sendConfirmationEmail = void 0;
const common_1 = require("@abb/common");
const mail_1 = __importDefault(require("@sendgrid/mail"));
mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
const sendConfirmationEmail = (recipient, url) => __awaiter(void 0, void 0, void 0, function* () {
    const msg = {
        to: recipient,
        from: "jose.munoz07c@gmail.com",
        subject: common_1.messages.email.confirmEmailSubject,
        html: `
    <strong>
      <a href="${url}">${common_1.messages.email.confirmBtn}</a>
    </strong>
    `,
    };
    try {
        yield mail_1.default.send(msg);
    }
    catch (err) {
        console.log(err);
    }
});
exports.sendConfirmationEmail = sendConfirmationEmail;
//# sourceMappingURL=sendEmail.js.map