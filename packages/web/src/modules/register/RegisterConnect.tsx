import { RegisterView } from "./view/RegisterView";
import { RegisterController } from "@abb/controller";

export const RegisterConnect = () => {
  return (
    <RegisterController>
      {({ loading, submit }) => <RegisterView submit={submit} loading={loading} />}
    </RegisterController>
  );
};
