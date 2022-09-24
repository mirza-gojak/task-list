import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, message, Popconfirm } from "antd";
import { ProjectItemProps } from "components/ProjectList/types";
import DataContext from "hooks/DataContext";
import { FC, useContext, useState } from "react";
import { getFullName } from "utils/userHelpers";

const ProjectItem: FC<ProjectItemProps> = ({ project, onEdit }) => {
  const { deleteProject, getUserById, getTasksByProjectId } =
    useContext(DataContext);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const handleOk = () => {
    setConfirmLoading(true);

    setTimeout(() => {
      setOpen(false);
      deleteProject(project.id);
      message.info("Project deleted");
      setConfirmLoading(false);
    }, 2000);
  };

  return (
    <Card
      actions={[
        <EditOutlined key="edit" onClick={() => onEdit(project)} />,
        <Popconfirm
          title="Delete this project?"
          onConfirm={handleOk}
          open={open}
          onCancel={() => setOpen(false)}
          okText="Yes"
          okButtonProps={{ loading: confirmLoading }}
          cancelText="No"
        >
          <DeleteOutlined key="ellipsis" onClick={() => setOpen(true)} />
        </Popconfirm>,
      ]}
      style={{ width: 300 }}
      hoverable
    >
      <Card.Meta
        title={project.title}
        description={`Owner: ${getFullName(getUserById(project.ownerId))}`}
      />
      <p style={{ margin: "10px 0 0" }}>
        Tasks: {getTasksByProjectId(project.id)?.length}
      </p>
    </Card>
  );
};

export default ProjectItem;
