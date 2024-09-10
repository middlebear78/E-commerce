import React, { useEffect } from "react";
import { Form, Button, Input } from "antd";

const UpdateCategoryForm = ({
  handleSubmit,
  name,
  setName,
  loading,
  form,
  currentCategory,
}) => {
  // Set form initial values when currentCategory changes
  useEffect(() => {
    form.setFieldsValue({ categoryName: currentCategory });
  }, [currentCategory, form]);

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      style={{ maxWidth: "100%" }}
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <Form.Item
        label={`Update category: ${currentCategory}`} // Dynamic label with currentCategory
        name="categoryName"
        rules={[
          {
            required: true,
            message: "Please input the category name",
          },
        ]}
      >
        <Input
          placeholder="Enter new category name"
          value={name} // Controlled input
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
          {loading ? "Saving..." : "Save new Category"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateCategoryForm;
