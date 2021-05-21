import { gql } from "@apollo/client";
import {
  useRegisterMutation,
  RegisterMutationVariables,
  RegisterMutation,
} from "../../types/graphql";

interface RCProps {
  children: (data: {
    submit: (values: RegisterMutationVariables) => Promise<null>;
    loading: boolean;
    data: RegisterMutation;
  }) => JSX.Element | null;
}

export const RegisterController = (props: RCProps) => {
  const [registerUser, { data, loading }] = useRegisterMutation();

  const submit = async (values: RegisterMutationVariables) => {
    console.log(values);
    await registerUser({ variables: values });
    return null;
  };

  return props.children({ submit, loading, data });
};

const RegisterMutation = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      path
      message
    }
  }
`;
