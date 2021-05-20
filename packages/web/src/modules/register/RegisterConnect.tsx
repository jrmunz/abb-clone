import { RegisterView } from "./view/RegisterView";

export const RegisterConnect = () => {
  const testSubmit = async (values: any) => {
    console.log(values);
    return null;
  };

  return <RegisterView submit={testSubmit} />;
};
