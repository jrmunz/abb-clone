import React from "react";
import { withFormik, Form, Field, FormikErrors } from "formik";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { registrationSchema as validationSchema } from "@abb/common";
import * as Antd from "antd";

import { InputField } from "../../shared/InputField";

interface FormValues {
  email: string;
  password: string;
}

interface RVProps {
  loading: boolean;
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
}

export const Register = (props: RVProps) => {
  const { Form: AntdForm, Button } = Antd;

  return (
    <Form style={{ display: "flex", justifyContent: "center", width: "100vw", height: "100vh" }}>
      <div style={{ display: "flex", flexDirection: "column", width: 400, marginTop: 100 }}>
        <Field
          type="email"
          name="email"
          placeholder="Email"
          component={InputField}
          prefix={<UserOutlined className="site-form-item-icon" />}
        />
        <Field
          type="password"
          name="password"
          placeholder="Password"
          component={InputField}
          prefix={<LockOutlined className="site-form-item-icon" />}
        />
        <AntdForm.Item style={{ alignSelf: "flex-end" }}>
          <a className="login-form-forgot" href="#-">
            Forgot password
          </a>
        </AntdForm.Item>
        <AntdForm.Item style={{ alignSelf: "center" }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={props.loading}
            className="login-form-button"
          >
            Register
          </Button>
        </AntdForm.Item>
        <AntdForm.Item style={{ alignSelf: "center" }}>
          Or <a href="#-">Login</a>
        </AntdForm.Item>
      </div>
    </Form>
  );
};

export const RegisterView = withFormik<RVProps, FormValues>({
  validationSchema,
  mapPropsToValues: () => ({ email: "", password: "" }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  },
})(Register);
