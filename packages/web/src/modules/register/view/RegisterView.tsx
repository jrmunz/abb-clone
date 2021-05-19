import { Form, Input, Checkbox, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { withFormik, FormikErrors, FormikProps } from "formik";
import * as yup from "yup";

interface FormValues {
  email: string;
  password: string;
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
          name="email"
          help={touched.email && errors.email ? errors.email : ""}
          validateStatus={touched.email && errors.email ? "error" : "success"}
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
          name="password"
          help={touched.password && errors.password ? errors.password : ""}
          validateStatus={touched.password && errors.password ? "error" : "success"}
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
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
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

const messages = {
  register: {
    emailNotLongEnough: "Email must be at least 3 characters",
    invalidEmail: "Email enter is not a valid email",
    passwordNotLongEnough: "Password must be at least 3 characters",
  },
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, messages.register.emailNotLongEnough)
    .email(messages.register.invalidEmail)
    .required(),
  password: yup.string().min(3, messages.register.passwordNotLongEnough).max(255).required(),
});

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
