import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, PageHeader } from "antd";
import Page from "components/Page";
import TaskList from "components/TaskList/TaskList";
import TaskModal from "components/TaskModal";
import { Task } from "models/Task";
import React, { FC, useState } from "react";

const TaskPage: FC = () => {
  const [taskModalVisible, setTaskModalVisible] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [task, setTask] = useState<Task | undefined>();

  const openTaskModal = (task?: Task) => {
    setTask(task);
    setTaskModalVisible(true);
  };

  const closeTaskModal = () => {
    setTaskModalVisible(false);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <Page>
      <div
        style={{
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          padding: "0px 50px",
        }}
      >
        <PageHeader
          onBack={() => null}
          title="Task List"
          backIcon={false}
          style={{ paddingLeft: 0, paddingRight: 0 }}
          extra={[
            <Input.Search
              key="search"
              value={search}
              onChange={handleSearch}
              placeholder="Search..."
            />,
            <Button
              key="addTask"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => openTaskModal(undefined)}
            >
              Add Task
            </Button>,
          ]}
        />
        <TaskList search={search} onEdit={openTaskModal} />
        {taskModalVisible && (
          <TaskModal onCancel={closeTaskModal} task={task} />
        )}
      </div>
    </Page>
  );
};

export default TaskPage;
