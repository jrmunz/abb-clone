import { Form, Input, Checkbox, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { withFormik, FormikErrors, FormikProps } from "formik";
import { validUserSchema as validationSchema } from "@abb/common";

interface FormValues {
  email: string;
  password: string;
  remember: boolean;
}

interface RVProps {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
}

export const Register = (props: FormikProps<FormValues> & RVProps) => {
  const { values, handleChange, handleBlur, handleSubmit, touched, errors } = props;

  return (
    <form
      style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      onSubmit={handleSubmit}
    >
      <div style={{ width: 400 }}>
        <Form.Item
          validateStatus={touched.email && errors.email ? "error" : "success"}
          help={touched.email && errors.email ? errors.email : ""}
        >
          <Input
            name="email"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Item>
        <Form.Item
          validateStatus={touched.password && errors.password ? "error" : "success"}
          help={touched.password && errors.password ? errors.password : ""}
        >
          <Input
            name="password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item valuePropName="checked" noStyle>
            <Checkbox
              name="remember"
              value={values.remember}
              checked={values.remember}
              onChange={handleChange}
            >
              Remember me
            </Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="#t">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Register
          </Button>
        </Form.Item>

        <Form.Item>
          Or <a href="#t">Login now!</a>
        </Form.Item>
      </div>
    </form>
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
