import { Layout, Menu, Popover } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { Content, Header } from "antd/lib/layout/layout";
import { PageProps } from "components/Page/types";
import UserContext from "hooks/UserContext";
import { MenuClickEventHandler } from "rc-menu/lib/interface";
import { FC, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getInitials, getFullName } from "utils/userHelpers";

const Page: FC<PageProps> = ({ children }) => {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const handleRedirect: MenuClickEventHandler = (info) => {
    navigate(info.key);
  };

  const avatarUrl =
    user?.avatarUrl || `https://joeschmoe.io/api/v1/${user?.email}`;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  if (!user) {
    return <></>;
  }

  return (
    <Layout
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        maxHeight: "100vh",
        maxWidth: "100vw",
      }}
    >
      <Header style={{ display: "flex" }}>
        <Menu
          mode="horizontal"
          theme="dark"
          selectedKeys={[location.pathname]}
          onClick={handleRedirect}
          items={[
            { key: "/home", label: "Home" },
            { key: "/calendar", label: "Calendar" },
            { key: "/projects", label: "Projects" },
            { key: "/team", label: "Team" },
          ]}
        />
        <div style={{ flex: 1 }} />
        <div style={{ color: "white", cursor: "pointer" }}>
          <Popover
            trigger="click"
            title="Actions"
            content={
              <div>
                <a
                  onClick={() => {
                    setUser(undefined);
                  }}
                >
                  Sign Out
                </a>
              </div>
            }
          >
            <Avatar src={avatarUrl} style={{ marginRight: 5, color: "white" }}>
              {getInitials(user)}
            </Avatar>
            {getFullName(user)}
          </Popover>
        </div>
      </Header>
      <Content style={{ paddingBottom: "50px" }}>{children}</Content>
    </Layout>
  );
};

export default Page;
