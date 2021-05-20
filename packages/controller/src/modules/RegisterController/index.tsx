import { gql, useMutation } from "@apollo/client";

interface RCProps {
  children: (data: {
    submit: (values: any) => Promise<null>;
    loading: boolean;
    data: any;
  }) => JSX.Element | null;
}
type OperationVariables = { email: string; password: string };

export const RegisterController = (props: RCProps) => {
  const [registerUser, { data, loading }] = useMutation<any, OperationVariables>(RegisterMutation);

  const submit = async (values: any) => {
    console.log(values);
    await registerUser({ variables: values });
    return null;
  };

  return props.children({ submit, loading, data });
};

const RegisterMutation = gql`
  mutation register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      path
      message
    }
  }
`;
