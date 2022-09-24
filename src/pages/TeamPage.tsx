import { FC, useState } from "react";
import { PageHeader, Button, Tooltip, Input } from "antd";
import TeamList from "components/TeamList";
import Page from "components/Page";
import {
  BarsOutlined,
  PlusOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  TableOutlined,
} from "@ant-design/icons";
import InviteModal from "components/TeamList/InviteModal";
import { SortType, ViewType } from "pages/types";

const TeamPage: FC = () => {
  const [inviteModalVisible, setInviteModalVisible] = useState<boolean>(false);
  const [viewType, setViewType] = useState<ViewType>(ViewType.Card);
  const [sortType, setSortType] = useState<SortType>(SortType.Descending);
  const [search, setSearch] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const openInviteModal = () => {
    setInviteModalVisible(true);
  };

  const closeInviteModal = () => {
    setInviteModalVisible(false);
  };

  const toggleViewType = () => {
    if (viewType === ViewType.Card) {
      setViewType(ViewType.List);
    } else {
      setViewType(ViewType.Card);
    }
  };

  const toggleSortType = () => {
    if (sortType === SortType.Ascending) {
      setSortType(SortType.Descending);
    } else {
      setSortType(SortType.Ascending);
    }
  };

  return (
    <Page>
      <div
        style={{
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          padding: "0px 50px",
          overflow: "auto",
        }}
      >
        <PageHeader
          onBack={() => null}
          title="Team Members"
          backIcon={false}
          style={{ paddingLeft: 0, paddingRight: 0 }}
          extra={[
            <Tooltip
              key="sort"
              title={
                sortType === SortType.Descending
                  ? "Sort Ascending"
                  : "Sort Descending"
              }
            >
              <Button
                type="text"
                onClick={toggleSortType}
                icon={
                  sortType === SortType.Descending ? (
                    <SortAscendingOutlined />
                  ) : (
                    <SortDescendingOutlined />
                  )
                }
              />
            </Tooltip>,
            <Tooltip
              key="card"
              title={viewType === ViewType.List ? "Card View" : "List View"}
            >
              <Button
                type="text"
                onClick={toggleViewType}
                icon={
                  viewType === ViewType.List ? (
                    <TableOutlined />
                  ) : (
                    <BarsOutlined />
                  )
                }
              />
            </Tooltip>,
            <Input.Search
              key="search"
              value={search}
              onChange={handleSearch}
              placeholder="Search..."
            />,
            <Button
              key="invite"
              type="primary"
              icon={<PlusOutlined />}
              onClick={openInviteModal}
            >
              Invite Users
            </Button>,
          ]}
        />
        <TeamList viewType={viewType} sortType={sortType} search={search} />
        {inviteModalVisible && (
          <InviteModal open={inviteModalVisible} onCancel={closeInviteModal} />
        )}
      </div>
    </Page>
  );
};

export default TeamPage;
