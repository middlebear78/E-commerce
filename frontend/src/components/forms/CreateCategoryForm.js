import React from "react";
import { Form, Button, Input } from "antd";

const CreateCategoryForm = ({ handleSubmit, name, setName, loading, form }) => {
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
        label="Category Name"
        name="categoryName"
        rules={[
          {
            required: true,
            message: "Please input the category name",
          },
        ]}
      >
        <Input
          placeholder="Enter category name"
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
          {loading ? "Saving..." : "Save Category"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateCategoryForm;
