import { FC, useContext, useMemo } from "react";
import { Card, List } from "antd";
import UserItem from "components/TeamList/UserItem";
import { TeamListProps } from "components/TeamList/types";
import { SortType, ViewType } from "pages/types";
import { getFullName } from "utils/userHelpers";
import DataContext from "hooks/DataContext";

const TeamList: FC<TeamListProps> = ({ viewType, sortType, search }) => {
  const { users } = useContext(DataContext);

  const sortedUsers = useMemo(() => {
    return users.sort((userA, userB) => {
      return sortType === SortType.Ascending
        ? getFullName(userA).localeCompare(getFullName(userB))
        : getFullName(userB).localeCompare(getFullName(userA));
    });
  }, [users, sortType]);

  const filteredUsers = useMemo(() => {
    let filtered = sortedUsers;
    if (search) {
      filtered = filtered.filter((user) =>
        getFullName(user).toLowerCase().includes(search.toLowerCase())
      );
    }
    return filtered;
  }, [sortedUsers, search, sortType]);

  return viewType === ViewType.Card ? (
    <Card bodyStyle={{ maxHeight: 600, overflowY: "auto" }}>
      {filteredUsers.map((user) => (
        <UserItem user={user} key={user.id} viewType={viewType} />
      ))}
      <Card.Grid style={{ display: "none" }} />
    </Card>
  ) : (
    <List
      itemLayout="horizontal"
      dataSource={filteredUsers}
      style={{
        backgroundColor: "white",
        padding: "10px 20px",
        border: "1px solid transparent",
        boxSizing: "border-box",
        overflow: "auto",
        height: "100%",
        maxHeight: "80vh",
      }}
      renderItem={(user) => (
        <UserItem user={user} key={user.id} viewType={viewType} />
      )}
    />
  );
};

export default TeamList;
