import { FC, useContext, useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Alert, Button, Checkbox, Form, Input, message } from "antd";
import { RegisterFormProps } from "components/LoginForm/types";
import DataContext from "hooks/DataContext";
import UserContext from "hooks/UserContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const RegisterForm: FC<RegisterFormProps> = ({ onFormChange }) => {
  const { users, addUser } = useContext(DataContext);
  const { setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    setIsLoading(true);
    setTimeout(() => {
      const user = users.find((user) => user.email === values.email);
      if (user) {
        setIsError(true);
        setIsLoading(false);
      } else {
        const newUser = { ...values, id: uuidv4() };
        addUser(newUser);
        setUser(newUser);
        message.success("Account created successfully");
        navigate("/home");
      }
    }, 1000);
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 4,
      },
    },
  };

  const formItemLayout = {
    wraperCol: { sm: { span: 15 } },
    labelCol: { sm: { span: 9 } },
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      labelAlign="left"
      onFinish={onFinish}
      style={{ width: 350 }}
    >
      <Form.Item
        name="firstName"
        label="First Name"
        rules={[{ required: true, message: "First Name is required!" }]}
        wrapperCol={formItemLayout.wraperCol}
        labelCol={formItemLayout.labelCol}
      >
        <Input placeholder="First Name" type="text" />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[{ required: true, message: "Last Name is required!" }]}
        wrapperCol={formItemLayout.wraperCol}
        labelCol={formItemLayout.labelCol}
      >
        <Input placeholder="Last Name" type="text" />
      </Form.Item>
      <Form.Item
        name="avatarUrl"
        label="Avatar URL"
        wrapperCol={formItemLayout.wraperCol}
        labelCol={formItemLayout.labelCol}
      >
        <Input placeholder="Avatar URL" type="text" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Email is required!" },
          { type: "email", message: "Invalid email format!" },
        ]}
        wrapperCol={formItemLayout.wraperCol}
        labelCol={formItemLayout.labelCol}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Email"
          type="email"
        />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        hasFeedback
        rules={[{ required: true, message: "Please enter your password!" }]}
        wrapperCol={formItemLayout.wraperCol}
        labelCol={formItemLayout.labelCol}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item
        label="Repeat Password"
        name="repeatPassword"
        dependencies={["password"]}
        hasFeedback
        wrapperCol={formItemLayout.wraperCol}
        labelCol={formItemLayout.labelCol}
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords do not match!"));
            },
          }),
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Repeat Password"
        />
      </Form.Item>
      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error("You need to accept agreement!")),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="#">agreement</a>
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
          loading={isLoading}
        >
          Register
        </Button>
        Or{" "}
        <a href="#" onClick={onFormChange}>
          Log In!
        </a>
      </Form.Item>
      {isError ? (
        <Alert
          type="error"
          message="User already exists!"
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

export default RegisterForm;
