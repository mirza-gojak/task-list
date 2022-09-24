import { Form, message, Modal, Input, Select } from "antd";
import { ProjectModalProps } from "components/ProjectModal/types";
import { FC, useContext, useState } from "react";
import { Colorpicker } from "antd-colorpicker";
import DataContext from "hooks/DataContext";
import { getFullName } from "utils/userHelpers";
import UserContext from "hooks/UserContext";
import { v4 as uuidv4 } from "uuid";

const ProjectModal: FC<ProjectModalProps> = ({ onCancel, project }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const { users, addProject, editProject } = useContext(DataContext);
  const { user } = useContext(UserContext);

  const handleSubmit = (values: any) => {
    setTimeout(() => {
      setConfirmLoading(false);
      if (project) {
        editProject(project.id, {
          ...project,
          ...values,
          color: values.color.hex,
        });
      } else {
        addProject({ ...values, color: values.color.hex, id: uuidv4() });
        message.success("Project added successfully!");
      }
      onCancel();
    }, 1000);
  };

  const formItemCols = {
    wrapperCol: {
      span: 20,
    },
    labelCol: {
      span: 4,
    },
  };

  return (
    <Modal
      open={true}
      title={project ? "Edit Project" : "Add Project"}
      okText={project ? "Save" : "Add"}
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
      <p>Enter project details.</p>
      <Form
        form={form}
        requiredMark={false}
        layout="horizontal"
        name="dynamic_form_item"
        initialValues={
          project
            ? { ...project, color: { hex: project.color } }
            : { ownerId: user?.id }
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
          name="ownerId"
          label="Owner"
          rules={[{ required: true, message: "Owner is required!" }]}
          wrapperCol={formItemCols.wrapperCol}
          labelCol={formItemCols.labelCol}
          labelAlign="left"
        >
          <Select placeholder="Owner" allowClear>
            {users?.map((user) => (
              <Select.Option value={user.id} key={user.id}>
                {getFullName(user)}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="color"
          label="Color"
          rules={[{ required: true, message: "Color is required!" }]}
          wrapperCol={formItemCols.wrapperCol}
          labelCol={formItemCols.labelCol}
          labelAlign="left"
        >
          <Colorpicker
            popup
            blockStyles={{
              width: "100%",
              height: "30px",
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProjectModal;
