import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { withFormik, FormikErrors, FormikProps, Field, Form } from "formik";
import { validUserSchema as validationSchema } from "@abb/common";
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

export const Register = (props: FormikProps<FormValues> & RVProps) => {
  const { Form: AntForm, Button } = Antd;

  return (
    <Form
      style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
    >
      <div style={{ width: 400, padding: "15px", display: "flex", flexDirection: "column" }}>
        <Field
          name="email"
          placeholder="Email"
          component={InputField}
          prefix={<UserOutlined className="site-form-item-icon" />}
        />
        <Field
          name="password"
          placeholder="Password"
          component={InputField}
          prefix={<LockOutlined className="site-form-item-icon" />}
        />
        <AntForm.Item style={{ alignSelf: "flex-end" }}>
          <a className="login-form-forgot" href="#_">
            Forgot password
          </a>
        </AntForm.Item>
        <AntForm.Item style={{ alignSelf: "center" }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={props.loading}
            className="login-form-button"
          >
            Register
          </Button>
        </AntForm.Item>
        <AntForm.Item style={{ alignSelf: "center" }}>
          Or <a href="#_">Log in</a>
        </AntForm.Item>
      </div>
    </Form>
  );
};

export const RegisterView = withFormik<RVProps, FormValues>({
  validationSchema,
  mapPropsToValues: () => ({ email: "", password: "", remember: false }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  },
})(Register);
