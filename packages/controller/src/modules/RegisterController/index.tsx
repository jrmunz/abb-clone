import { gql } from "@apollo/client";
import { MutationRegisterArgs, useRegisterMutation } from "../../types/graphql";

interface RCProps {
  children: (data: {
    loading: boolean;
    submit: (values: MutationRegisterArgs) => Promise<null>;
  }) => JSX.Element;
}

export const RegisterController = (props: RCProps) => {
  const [registerUser, { loading }] = useRegisterMutation();

  const submit = async (values: MutationRegisterArgs) => {
    console.log(values);
    await registerUser({ variables: values });
    return null;
  };

  return props.children({ loading, submit });
};

export const RegisterMutation = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      path
      message
    }
  }
`;
