import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { Field, FormikErrors, FormikProps, withFormik } from "formik";
import { registrationSchema as validationSchema } from "@abb/common";

import { InputField } from "../../shared/InputField";

interface FormValues {
  email: string;
  password: string;
}

interface RVProps {
  loading: boolean;
  submit: (values: FormValues) => Promise<FormikErrors<any> | null>;
}

export const Register = (props: FormikProps<any> & RVProps) => {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        paddingVertical: 70,
        paddingHorizontal: 25,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Field type="email" name="email" placeholder="Email" component={InputField} />
      <Field
        type="password"
        secureTextEntry={true}
        name="password"
        placeholder="Password"
        component={InputField}
      />
      <Button style={{ marginTop: 50, width: 120 }} onPress={props.handleSubmit} title="Register" />
    </View>
  );
};

export const RegisterView = withFormik<RVProps, FormValues>({
  validationSchema,
  mapPropsToValues: () => ({ email: "", password: "" }),
  handleSubmit: async (values, { props, setErrors, resetForm }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    } else {
      resetForm();
    }
  },
})(Register);
