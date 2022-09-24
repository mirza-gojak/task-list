import {
  SortAscendingOutlined,
  SortDescendingOutlined,
  TableOutlined,
  BarsOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { PageHeader, Tooltip, Button, Input } from "antd";
import Page from "components/Page";
import ProjectList from "components/ProjectList/ProjectList";
import ProjectModal from "components/ProjectModal";
import { Project } from "models/Project";
import { ViewType, SortType } from "pages/types";
import { FC, useState } from "react";

const ProjectPage: FC = () => {
  const [viewType, setViewType] = useState<ViewType>(ViewType.List);
  const [sortType, setSortType] = useState<SortType>(SortType.Descending);
  const [projectModalVisible, setProjectModalVisible] =
    useState<boolean>(false);

  const [project, setProject] = useState<Project | undefined>();
  const [search, setSearch] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const openProjectModal = (project?: Project) => {
    setProject(project);
    setProjectModalVisible(true);
  };

  const closeProjectModal = () => {
    setProjectModalVisible(false);
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
          title="Project List"
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
              key="addProject"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => openProjectModal(undefined)}
            >
              Add Project
            </Button>,
          ]}
        />
        <ProjectList
          viewType={viewType}
          sortType={sortType}
          onEdit={openProjectModal}
          search={search}
        />
        {projectModalVisible && (
          <ProjectModal onCancel={closeProjectModal} project={project} />
        )}
      </div>
    </Page>
  );
};

export default ProjectPage;
