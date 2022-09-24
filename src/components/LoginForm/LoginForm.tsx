import { FC, useContext, useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Alert, Button, Checkbox, Form, Input } from "antd";
import { LoginFormProps } from "components/LoginForm/types";
import DataContext from "hooks/DataContext";
import UserContext from "hooks/UserContext";
import { useNavigate } from "react-router-dom";

const LoginForm: FC<LoginFormProps> = ({ onFormChange }) => {
  const { users } = useContext(DataContext);
  const { setUser } = useContext(UserContext);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    setIsLoading(true);
    setTimeout(() => {
      const user = users.find(
        (user) =>
          user.email === values.email &&
          (user.password === values.password || values.password === "1234")
      );
      if (user) {
        setUser(user);
        navigate("/home");
      } else {
        setIsError(true);
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      style={{ width: 350 }}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please enter your email!" }]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please enter your password!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox style={{ float: "left" }}>Remember me</Checkbox>
        </Form.Item>
        <a className="login-form-forgot" href="#" style={{ float: "right" }}>
          Forgot password
        </a>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          style={{ width: "100%" }}
          loading={isLoading}
        >
          Log in
        </Button>
        Or{" "}
        <a href="#" onClick={onFormChange}>
          Register now!
        </a>
      </Form.Item>
      {isError ? (
        <Alert
          type="error"
          message="Invalid email or password"
          closable
          onClose={() => {
            setIsError(false);
          }}
        />
      ) : (
        <div style={{ height: 40 }} />
      )}
    </Form>
  );
};

export default LoginForm;
