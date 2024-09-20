import React from "react";
import { Form, Input, Select, Button } from "antd";

const CreateProductForm = ({
  form,
  values,
  loading,
  handleChange,
  handleCategoryChange,
  handleSubmit,
  colors,
  brands,
  categories,
  subOptions,
  showSub,
  setValues,
}) => {
  const {
    title,
    description,
    price,
    category,
    subcategory,
    quantity,
    sold,
    images,
    shipping,
    color,
    brand,
  } = values;
  const { Option } = Select;

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
      categories={categories}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please input the product title" }]}
      >
        <Input
          name="title"
          placeholder="Enter product title"
          onChange={handleChange}
          value={title}
        />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          { required: true, message: "Please input the product description" },
        ]}
      >
        <Input
          name="description"
          placeholder="Enter product description"
          onChange={handleChange}
          value={description}
        />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: "Please input the product price" }]}
      >
        <Input
          name="price"
          placeholder="Enter product price"
          onChange={handleChange}
          value={price}
        />
      </Form.Item>

      <Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: "Please select a category" }]}
      >
        <Select onChange={handleCategoryChange} placeholder="Select a category">
          {categories && categories.length > 0 ? (
            categories.map((c) => (
              <Select.Option key={c._id} value={c._id}>
                {c.name}
              </Select.Option>
            ))
          ) : (
            <Select.Option disabled value="">
              No categories available
            </Select.Option>
          )}
        </Select>
      </Form.Item>

      <Form.Item label="Sub Category" name="subcategory">
        <Select
          mode="multiple"
          onChange={(value) => setValues({ ...values, subcategory: value })}
          placeholder="Select a category"
          value={subcategory}
        >
          {subOptions && subOptions.length > 0 ? (
            subOptions.map((o) => (
              <Select.Option key={o._id} value={o._id}>
                {o.name}
              </Select.Option>
            ))
          ) : (
            <Select.Option disabled value="">
              No sub-categories available
            </Select.Option>
          )}
        </Select>
      </Form.Item>

      <Form.Item
        label="Quantity"
        name="quantity"
        rules={[{ required: true, message: "Please input product quantity" }]}
      >
        <Input
          name="quantity"
          type="number"
          placeholder="Enter product quantity"
          onChange={handleChange}
          value={quantity}
        />
      </Form.Item>

      <Form.Item label="Sold" name="sold">
        <Input
          name="sold"
          placeholder="Enter product sold number"
          onChange={handleChange}
          value={sold}
        />
      </Form.Item>

      <Form.Item label="Images" name="images">
        <Input
          name="images"
          placeholder="Add product images"
          onChange={handleChange}
          value={images}
        />
      </Form.Item>

      <Form.Item
        label="Shipping"
        name="shipping"
        rules={[{ required: true, message: "Please add product shipping" }]}
      >
        <Select
          name="shipping"
          onChange={(value) =>
            handleChange({ target: { name: "shipping", value } })
          }
          value={shipping}
        >
          <Option value="No">No</Option>
          <Option value="Yes">Yes</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Color"
        name="color"
        rules={[{ required: true, message: "Please add product color" }]}
      >
        <Select
          name="color"
          onChange={(value) =>
            handleChange({ target: { name: "color", value } })
          }
          value={color}
        >
          {colors.map((color) => (
            <Option key={color} value={color}>
              {color}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Brand" name="brand">
        <Select
          name="brand"
          onChange={(value) =>
            handleChange({ target: { name: "brand", value } })
          }
          value={brand}
        >
          {brands.map((brand) => (
            <Option key={brand} value={brand}>
              {brand}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Product"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateProductForm;
