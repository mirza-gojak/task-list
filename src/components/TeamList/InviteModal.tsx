import { FC, useState } from "react";
import { Form, Input, Modal, Button, message } from "antd";
import { InviteModalProps } from "components/TeamList/types";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import "./invite-modal.css";

const InviteModal: FC<InviteModalProps> = ({ open, onCancel }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    setTimeout(() => {
      setConfirmLoading(false);
      message.success("Invitation emails sent successfully!");
      onCancel();
    }, 2000);
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };

  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };

  return (
    <Modal
      open={open}
      title="Invite New Users"
      okText="Invite"
      cancelText="Cancel"
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      onOk={() => {
        form
          .validateFields()
          .then(() => {
            setConfirmLoading(true);
            handleSubmit();
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <p>Enter one or more emails to invite users.</p>
      <Form
        {...formItemLayoutWithOutLabel}
        form={form}
        requiredMark={false}
        layout="horizontal"
        name="dynamic_form_item"
        initialValues={{ emails: [""] }}
      >
        <Form.List name="emails">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  wrapperCol={{
                    ...(index === 0
                      ? formItemLayout.wrapperCol
                      : formItemLayoutWithOutLabel.wrapperCol),
                  }}
                  labelCol={formItemLayout.labelCol}
                  label={
                    index === 0 ? (fields.length > 1 ? "Emails" : "Email") : ""
                  }
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    requiredMark={undefined}
                    rules={[
                      {
                        required: true,
                        message: "Email is required!",
                      },
                      {
                        type: "email",
                        message: "Invalid format!",
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      placeholder="example@email.com"
                      style={{ width: "80%" }}
                    />
                  </Form.Item>
                  {index > 0 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: "80%" }}
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default InviteModal;
