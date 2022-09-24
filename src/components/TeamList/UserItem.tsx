import React, { FC } from "react";

import { UserItemProps } from "components/TeamList/types";
import { Card, Avatar, List } from "antd";
import { getFullName, getInitials } from "utils/userHelpers";
import { ViewType } from "pages/types";

const UserItem: FC<UserItemProps> = ({ user, viewType }) => {
  const fullName = getFullName(user);
  const initials = getInitials(user);

  const gridStyle: React.CSSProperties = {
    width: "20%",
    minWidth: 250,
  };

  const avatarUrl =
    user.avatarUrl || `https://joeschmoe.io/api/v1/${user.email}`;

  return viewType === ViewType.Card ? (
    <Card.Grid style={gridStyle}>
      <Card.Meta
        title={fullName}
        description={user.email}
        avatar={<Avatar src={avatarUrl}>{initials}</Avatar>}
      />
    </Card.Grid>
  ) : (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar src={avatarUrl}>{initials}</Avatar>}
        title={<h3>{getFullName(user)}</h3>}
        description={user.email}
      />
    </List.Item>
  );
};

export default UserItem;
