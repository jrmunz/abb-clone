import { gql } from "@apollo/client";
import { MutationRegisterArgs, RegisterMutation, useRegisterMutation } from "../../types/graphql";

interface RCProps {
  children: (data: {
    data: RegisterMutation;
    loading: boolean;
    submit: (values: MutationRegisterArgs) => Promise<null>;
  }) => JSX.Element;
}

export const RegisterController = (props: RCProps) => {
  const [registerUser, { loading, data }] = useRegisterMutation();

  const submit = async (values: MutationRegisterArgs) => {
    console.log(values);
    await registerUser({ variables: values });
    return null;
  };

  return props.children({ data, loading, submit });
};

const RegisterMutation = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      path
      message
    }
  }
`;
