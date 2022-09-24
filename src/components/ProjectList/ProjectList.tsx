import { FC, useContext, useMemo, useState } from "react";
import { SortType, ViewType } from "pages/types";
import { Project } from "models/Project";
import ProjectItem from "components/ProjectList/ProjectItem";
import { Avatar, message, Popconfirm, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ProjectListProps } from "components/ProjectList/types";
import "./project-list.css";
import DataContext from "hooks/DataContext";
import { getFullName, getInitials } from "utils/userHelpers";

const ProjectList: FC<ProjectListProps> = ({
  viewType,
  sortType,
  onEdit,
  search,
}) => {
  const { projects, getUserById, deleteProject, getTasksByProjectId } =
    useContext(DataContext);
  const [open, setOpen] = useState<string | undefined>();
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const columns: ColumnsType<Project> = [
    {
      title: "Title",
      dataIndex: "title",
      width: "50%",
      render: (_, project) => (
        <div
          style={{
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          {project.title}
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 4,
              border: "1px solid #00000022",
              backgroundColor: project.color,
            }}
          />
        </div>
      ),
    },
    {
      title: "Owner",
      dataIndex: "ownerId",
      width: "20%",
      render: (_, project) => {
        const user = getUserById(project.ownerId);
        const avatarUrl =
          user?.avatarUrl || `https://joeschmoe.io/api/v1/${user?.email}`;
        return user ? (
          <>
            <Avatar src={avatarUrl} style={{ marginRight: 5 }}>
              {getInitials(user)}
            </Avatar>
            {getFullName(user)}
          </>
        ) : (
          ""
        );
      },
    },
    {
      title: "Task Count",
      dataIndex: "title",
      render: (_, project) => getTasksByProjectId(project.id)?.length,
      width: "10%",
    },
    {
      title: "Action",
      width: "20%",
      render: (_, project) => (
        <Space size="middle">
          <a onClick={() => onEdit(project)}>Edit</a>
          <Popconfirm
            title="Delete this project?"
            open={open === project.id}
            onConfirm={() => {
              setConfirmLoading(true);
              setTimeout(() => {
                setOpen(undefined);
                deleteProject(project.id);
                message.info("Project deleted");
                setConfirmLoading(false);
              }, 2000);
            }}
            onCancel={() => setOpen(undefined)}
            okButtonProps={{ loading: confirmLoading }}
            okText="Yes"
            cancelText="No"
          >
            <a onClick={() => setOpen(project.id)}>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const sortedProjects = useMemo(() => {
    return projects?.sort((projectA, projectB) => {
      return sortType === SortType.Ascending
        ? projectA.title.localeCompare(projectB.title)
        : projectB.title.localeCompare(projectA.title);
    });
  }, [projects, sortType, search]);

  const filteredProjects = useMemo(() => {
    let filtered = sortedProjects;
    if (search) {
      filtered = filtered.filter((project) =>
        project.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    return filtered;
  }, [sortedProjects, search, viewType, sortType]);

  return viewType === ViewType.Card ? (
    <div
      className="project-list-wrapper"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 20,
        overflow: "auto",
      }}
    >
      {filteredProjects?.map((project) => (
        <ProjectItem project={project} key={project.id} onEdit={onEdit} />
      ))}
    </div>
  ) : (
    <Table
      columns={columns}
      dataSource={[...filteredProjects]}
      pagination={{ pageSize: 10 }}
      rowKey="id"
    />
  );
};

export default ProjectList;
