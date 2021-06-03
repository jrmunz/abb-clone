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

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, messages.login.invalidCridentials)
    .email(messages.login.invalidCridentials)
    .required(),
  password: yup
    .string()
    .min(3, messages.login.invalidCridentials)
    .max(255, messages.login.invalidCridentials)
    .required(),
});
