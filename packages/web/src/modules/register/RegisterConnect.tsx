import React from "react";
import { RegisterController } from "@abb/controller";

import { RegisterView } from "./view/RegisterView";

export const RegisterConnect = () => {
  return (
    <RegisterController>
      {({ loading, submit }) => <RegisterView submit={submit} loading={loading} />}
    </RegisterController>
  );
};
