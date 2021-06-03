import { Error } from "../types/graphql";

export const formatErrors = (errors: Error[]) => {
  let errMap: { [key: string]: string } = {};

  errors.forEach((error) => {
    errMap[error.path] = error.message;
  });

  return errMap;
};
