import { Form, message, Modal, Input, Select, DatePicker } from "antd";
import { FC, useContext, useState } from "react";
import { TaskModalProps } from "components/TaskModal/types";
import { Priority, Status } from "models/Task";
import moment from "moment";
import { toCaptialCase } from "utils/helpers";
import { RangePickerProps } from "antd/lib/date-picker";
import DataContext from "hooks/DataContext";
import UserContext from "hooks/UserContext";
import { v4 as uuidv4 } from "uuid";
import { getFullName } from "utils/userHelpers";

const TaskModal: FC<TaskModalProps> = ({ onCancel, task }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const { users, projects, addTask, editTask } = useContext(DataContext);
  const { user } = useContext(UserContext);

  const handleSubmit = (values: any) => {
    setTimeout(() => {
      setConfirmLoading(false);
      if (task) {
        editTask(task.id, {
          ...task,
          ...values,
          dueDate: moment(values.dueDate),
        });
      } else {
        addTask({ ...values, id: uuidv4(), status: Status.InProgress });
        message.success("Task added successfully!");
      }
      onCancel();
    }, 2000);
  };

  const formItemCols = {
    wrapperCol: {
      span: 20,
    },
    labelCol: {
      span: 4,
    },
  };

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < moment().startOf("day");
  };

  return (
    <Modal
      open={true}
      title={task ? "Edit Task" : "Add Task"}
      okText={task ? "Save" : "Add"}
      cancelText="Cancel"
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      onOk={() => {
        form
          .validateFields()
          .then(() => {
            setConfirmLoading(true);
            handleSubmit(form.getFieldsValue());
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <p>Enter task details.</p>
      <Form
        form={form}
        requiredMark={false}
        layout="horizontal"
        name="dynamic_form_item"
        initialValues={
          task
            ? { ...task, dueDate: moment(task.dueDate) }
            : {
                assigneeId: user?.id,
                priority: Priority.Medium,
                dueDate: moment(new Date(Date.now())),
              }
        }
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Title is required!" }]}
          wrapperCol={formItemCols.wrapperCol}
          labelCol={formItemCols.labelCol}
          labelAlign="left"
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          name="content"
          label="Description"
          wrapperCol={formItemCols.wrapperCol}
          labelCol={formItemCols.labelCol}
          labelAlign="left"
        >
          <Input.TextArea placeholder="Description" />
        </Form.Item>
        <Form.Item
          name="dueDate"
          label="Due Date"
          rules={[{ required: true, message: "Due Date is required!" }]}
          wrapperCol={formItemCols.wrapperCol}
          labelCol={formItemCols.labelCol}
          labelAlign="left"
        >
          <DatePicker
            placeholder="Due Date"
            style={{ width: "100%" }}
            format="DD.MM.yyyy"
            disabledDate={disabledDate}
          />
        </Form.Item>
        <Form.Item
          name="assigneeId"
          label="Assignee"
          rules={[{ required: true, message: "Assignee is required!" }]}
          wrapperCol={formItemCols.wrapperCol}
          labelCol={formItemCols.labelCol}
          labelAlign="left"
        >
          <Select placeholder="Assignee" allowClear>
            {users?.map((user) => (
              <Select.Option value={user.id} key={user.id}>
                {getFullName(user)}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="projectId"
          label="Project"
          wrapperCol={formItemCols.wrapperCol}
          labelCol={formItemCols.labelCol}
          labelAlign="left"
        >
          <Select placeholder="Project" allowClear>
            {projects?.map((project) => (
              <Select.Option value={project.id} key={project.id}>
                {project.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="priority"
          label="Priority"
          rules={[{ required: true, message: "Priority is required!" }]}
          wrapperCol={formItemCols.wrapperCol}
          labelCol={formItemCols.labelCol}
          labelAlign="left"
        >
          <Select placeholder="Priority" allowClear>
            <Select.Option value={Priority.Low}>
              {toCaptialCase(Priority.Low)}
            </Select.Option>
            <Select.Option value={Priority.Medium}>
              {toCaptialCase(Priority.Medium)}
            </Select.Option>
            <Select.Option value={Priority.High}>
              {toCaptialCase(Priority.High)}
            </Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskModal;
