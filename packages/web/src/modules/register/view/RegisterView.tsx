import { Form, Input, Checkbox, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

export const RegisterView = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: 400 }}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
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
    </div>
  );
};

export default RegisterView;
