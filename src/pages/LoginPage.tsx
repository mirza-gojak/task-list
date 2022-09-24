import { FC, useState } from "react";
import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import RegisterForm from "components/LoginForm/RegisterForm";
import LoginForm from "components/LoginForm/LoginForm";

const LoginPage: FC = () => {
  const [showRegister, setShowRegister] = useState<boolean>(false);

  const handleFormChange = () => {
    setShowRegister(!showRegister);
  };

  return (
    <Layout>
      <Content
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>Welcome to Task List!</h2>
        <p>Log In or Register to Proceed</p>
        {showRegister ? (
          <RegisterForm onFormChange={handleFormChange} />
        ) : (
          <LoginForm onFormChange={handleFormChange} />
        )}
      </Content>
    </Layout>
  );
};

export default LoginPage;
