import { gql } from "@apollo/client";
import { useLoginMutation, MutationLoginArgs } from "../../types/graphql";

import { formatErrors } from "../../utils/formatErrors";

interface LCProps {
  children: (data: {
    loading: boolean;
    submit: (values: MutationLoginArgs) => Promise<any>;
  }) => JSX.Element;
}

export const LoginController = (props: LCProps) => {
  const [loginUser, { loading }] = useLoginMutation();

  const onSubmit = async (values: MutationLoginArgs) => {
    try {
      const { data } = await loginUser({ variables: values });
      if (data!.login) {
        return formatErrors(data!.login);
      }
    } catch (err) {
      return err;
    }

    return null;
  };

  return props.children({ loading, submit: onSubmit });
};

export const LoginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      path
      message
    }
  }
`;
