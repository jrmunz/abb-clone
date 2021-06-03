import { LoginController } from "@abb/controller";

import { LoginView } from "./view/LoginView";

export const LoginConnect = () => {
  return (
    <LoginController>
      {({ loading, submit }) => <LoginView loading={loading} submit={submit} />}
    </LoginController>
  );
};
