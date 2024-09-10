import React from "react";
import { Form, Button, Input } from "antd";

const CreateSubCategoryForm = ({
  handleSubmit,
  name,
  setName,
  loading,
  form,
}) => {
  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      style={{ maxWidth: "100%" }}
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <Form.Item
        label="Sub Category Name"
        name="subCategoryName"
        rules={[
          {
            required: true,
            message: "Please input Sub category name",
          },
        ]}
      >
        <Input
          placeholder="Enter Sub category name"
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
          disabled={!name || loading}
        >
          {loading ? "Saving..." : "Save Sub Category"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateSubCategoryForm;
