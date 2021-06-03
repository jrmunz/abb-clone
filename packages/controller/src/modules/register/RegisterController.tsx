import { gql } from "@apollo/client";
import { useRegisterMutation, MutationRegisterArgs } from "../../types/graphql";

interface RCProps {
  children: (data: {
    loading: boolean;
    submit: (values: MutationRegisterArgs) => Promise<null>;
  }) => JSX.Element;
}

export const RegisterController = (props: RCProps) => {
  const [newRegistration, { loading }] = useRegisterMutation();

  const onSubmit = async (values: MutationRegisterArgs) => {
    try {
      await newRegistration({ variables: values });
      return null;
    } catch (err) {
      console.log("error: ", err);
      return err;
    }
  };

  return props.children({ loading, submit: onSubmit });
};

export const RegisterMutation = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      path
      message
    }
  }
`;
