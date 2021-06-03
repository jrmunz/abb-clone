import * as yup from "yup";

import { messages } from "../lang";

const passwordShape = yup
  .string()
  .min(3, messages.register.passwordNotLongEnough)
  .max(255)
  .required();

export const newPasswordSchema = yup.object().shape({
  newPassword: passwordShape,
});

export const registrationSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, messages.register.emailNotLongEnough)
    .email(messages.register.invalidEmail)
    .required(),
  password: passwordShape,
});
