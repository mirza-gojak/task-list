import { FC, useContext, useMemo, useState } from "react";
import { Avatar, message, Popconfirm, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Priority, Status, Task } from "models/Task";
import { mapStatusToText, sortByPriority, toCaptialCase } from "utils/helpers";
import moment from "moment";
import "./task-list.css";
import { TaskListProps } from "components/TaskList/types";
import DataContext from "hooks/DataContext";
import { getFullName, getInitials } from "utils/userHelpers";

const TaskList: FC<TaskListProps> = ({ search, onEdit }) => {
  const [myTasks, setMyTasks] = useState<boolean>(false);
  const [open, setOpen] = useState<string | undefined>();
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const {
    tasks,
    getUserById,
    getProjectById,
    deleteTask,
    users,
    projects,
    editTask,
  } = useContext(DataContext);

  const filteredTasks = useMemo(() => {
    let filtered = tasks;
    if (myTasks) {
      filtered = tasks.filter((task) => task.assigneeId === "OWNER");
    }
    if (search) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    return filtered;
  }, [tasks, myTasks, search]);

  const columns: ColumnsType<Task> = [
    {
      title: "Title",
      dataIndex: "title",
      width: "15%",
      sortDirections: ["ascend", "descend"],
      sorter: (taskA, taskB) => taskA.title.localeCompare(taskB.title),
    },
    {
      title: "Description",
      dataIndex: "content",
      width: myTasks ? "30%" : "20%",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      width: "15%",
      render: (_, task) => moment(task.dueDate).format("DD.MM.yyyy"),
      sortDirections: ["ascend", "descend", "ascend"],
      sorter: (taskA, taskB) =>
        moment(taskA.dueDate).valueOf() - moment(taskB.dueDate).valueOf(),
    },
    {
      title: "Project",
      dataIndex: "projectId",
      width: "10%",
      render: (_, task) => getProjectById(task.projectId || "")?.title || "",
      sortDirections: ["ascend", "descend", "ascend"],
      sorter: (taskA, taskB) =>
        (taskA.projectId || "").localeCompare(taskB.projectId || ""),
      filters: projects.map((project) => ({
        text: project.title,
        value: project.id,
      })),
      onFilter: (value, task) => task.projectId === value,
    },
    {
      title: "Assignee",
      dataIndex: "assigneeId",
      width: "10%",
      render: (_, task) => {
        const user = getUserById(task.assigneeId || "");
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
      filters: users.map((user) => ({
        text: getFullName(user),
        value: user.id,
      })),
      onFilter: (value, task) => task.assigneeId === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "10%",
      filters: [
        { text: mapStatusToText(Status.InProgress), value: Status.InProgress },
        { text: mapStatusToText(Status.Completed), value: Status.Completed },
        { text: mapStatusToText(Status.Expired), value: Status.Expired },
      ],
      onFilter: (value, task) => task.status === value,
      render: (_, task) => mapStatusToText(task.status),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      width: "10%",
      filters: [
        { text: toCaptialCase(Priority.Low), value: Priority.Low },
        { text: toCaptialCase(Priority.Medium), value: Priority.Medium },
        { text: toCaptialCase(Priority.High), value: Priority.High },
      ],
      onFilter: (value, task) => task.priority === value,
      render: (_, task) => toCaptialCase(task.priority),
      sortDirections: ["ascend", "descend", "ascend"],
      sorter: (taskA, taskB) => sortByPriority(taskA.priority, taskB.priority),
    },
    {
      title: "Action",
      width: "10%",
      render: (_, task) => (
        <Space size="middle">
          <a onClick={() => onEdit(task)}>Edit</a>
          <Popconfirm
            title="Delete this task?"
            open={open === task.id}
            onConfirm={() => {
              setConfirmLoading(true);
              setTimeout(() => {
                setOpen(undefined);
                deleteTask(task.id);
                message.info("Task deleted");
                setConfirmLoading(false);
              }, 2000);
            }}
            onCancel={() => setOpen(undefined)}
            okButtonProps={{ loading: confirmLoading }}
            okText="Yes"
            cancelText="No"
          >
            <a onClick={() => setOpen(task.id)}>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selections: filteredTasks.filter(
      (task) => task.status === Status.Completed
    ),
  };

  return (
    <Table
      columns={
        myTasks
          ? columns.filter((column) => column.title !== "Assignee")
          : columns
      }
      dataSource={[...filteredTasks]}
      pagination={{ pageSize: 10 }}
      rowSelection={{
        type: "checkbox",
        selectedRowKeys: rowSelection.selections.map((task) => task.id),
        onSelect: (selectedTask: Task) => {
          editTask(selectedTask.id, {
            ...selectedTask,
            status:
              selectedTask.status === Status.Completed
                ? Status.InProgress
                : Status.Completed,
          });
        },
      }}
      rowClassName={(task) =>
        task.status === Status.Completed ? "task-completed" : ""
      }
      rowKey="id"
    />
  );
};

export default TaskList;
