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
    <Form style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: 400 }}>
        <Field
          name="email"
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
          component={InputField}
        />
        <Field
          name="password"
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Password"
          component={InputField}
        />
        <AntForm.Item>
          <a className="login-form-forgot" href="#t">
            Forgot password
          </a>
        </AntForm.Item>

        <AntForm.Item>
          <Button
            type="primary"
            loading={props.loading}
            htmlType="submit"
            className="login-form-button"
          >
            Register
          </Button>
        </AntForm.Item>

        <AntForm.Item>
          Or <a href="#t">Login now!</a>
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
