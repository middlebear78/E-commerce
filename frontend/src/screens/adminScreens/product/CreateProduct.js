import React, { useState, useEffect } from "react";
import { Row, Col, Form, Card, Button, Input, Select } from "antd";
import AdminNav from "../../../components/nav/AdminNav";
import notify from "../../../utils/notify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import SearchFilter from "../../../components/forms/SearchFilter";
import { createProduct } from "../../../services/productService/productService";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subcategories: [],
  quantity: "",
  sold: "",
  images: [],
  shipping: "",
  colors: ["black", "white", "silver", "blue", "brown"],
  color: "",
  brands: ["Samsung", "Lenovo", "Apple", "Microsoft", "Nvidia"],
  brand: "",
};

function CreateProduct() {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialState);
  const [form] = Form.useForm();
  const { Option } = Select;

  const {
    title,
    description,
    price,
    categories,
    category,
    subcategory,
    quantity,
    sold,
    images,
    shipping,
    colors,
    color,
    brands,
    brand,
  } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    //
  };
  const handleChange = (e) => {};

  return (
    <div className="container-fluid">
      <Row gutter={16}>
        <Col span={4}>
          <AdminNav />
        </Col>
        <Col span={18}>
          <div className="content">
            <Card
              title={loading ? "Loading..." : "Create Product"}
              style={{
                width: "100%",
                maxWidth: 1200,
                margin: "100px auto 0 auto",
              }}
            >
              <Form
                form={form}
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: "100%" }}
                initialValues={{ remember: true }}
                // onFinish={handleSubmit}
                autoComplete="off"
              >
                <Form.Item
                  label="Title"
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: "Please input the product title",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter product title"
                    onChange={handleChange}
                    value={title}
                  />
                </Form.Item>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Please input the product description",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter product description"
                    onChange={handleChange}
                    value={description}
                  />
                </Form.Item>

                <Form.Item
                  label="Price"
                  name="price"
                  rules={[
                    {
                      required: true,
                      message: "Please input the product price",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter product price"
                    onChange={handleChange}
                    value={price}
                  />
                </Form.Item>

                {/* <Form.Item
                  label="Categories"
                  name="categories"
                  rules={[
                    {
                      required: true,
                      message: "Please input the product category",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter product categories"
                    onChange={handleChange}
                    value={categories}
                  />
                </Form.Item> */}

                <Form.Item
                  label="Category"
                  name="category"
                  rules={[
                    {
                      required: true,
                      message: "Please input the product category",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter product category"
                    onChange={handleChange}
                    value={category}
                  />
                </Form.Item>

                <Form.Item
                  label="Sub Category"
                  name="subcategory"
                  rules={[
                    {
                      required: true,
                      message: "Please input  product Sub category",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter product Sub category"
                    onChange={handleChange}
                    value={subcategory}
                  />
                  {/* </Form.Item>

                {/* <Form.Item
                  label="Sub Categories"
                  name="subcategories"
                  rules={[
                    {
                      required: true,
                      message: "Please input product Sub categories",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter product Sub categories"
                    onChange={handleChange}
                    value={subcategories}
                    /> */}
                </Form.Item>
                <Form.Item
                  label="Quantity"
                  name="quantity"
                  type="number"
                  rules={[
                    {
                      required: true,
                      message: "Please input product quantity",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter product description"
                    onChange={handleChange}
                    value={quantity}
                  />
                </Form.Item>

                <Form.Item
                  label="Sold"
                  name="sold"
                  rules={[
                    {
                      required: false,
                      message: "Please input product sold number",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter product sold number"
                    onChange={handleChange}
                    value={sold}
                  />
                </Form.Item>

                <Form.Item
                  label="Images"
                  name="images"
                  rules={[
                    {
                      required: true,
                      message: "Please add the product images",
                    },
                  ]}
                >
                  <Input
                    placeholder="add product images"
                    onChange={handleChange}
                    value={images}
                  />
                </Form.Item>

                <Form.Item
                  label="Shipping"
                  name="shipping"
                  rules={[
                    {
                      required: true,
                      message: "Please add product shipping",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select a parent category"
                    optionFilterProp="children"
                    onChange={handleChange}
                    style={{ width: "100%", height: "40px" }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    <Option value="No">No</Option>
                    <Option value="Yes">Yes</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Color"
                  name="color"
                  rules={[
                    {
                      required: true,
                      message: "Please add product color",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select a product color"
                    optionFilterProp="children"
                    onChange={handleChange}
                    style={{ width: "100%", height: "40px" }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    {colors.map((color) => (
                      <Option key={color} value={color}>
                        {color}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Brand"
                  name="brand"
                  rules={[
                    {
                      required: false,
                      message: "Please add product brand",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select a product brand"
                    optionFilterProp="children"
                    onChange={handleChange}
                    style={{ width: "100%", height: "40px" }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
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
                    // disabled={!name || loading}
                  >
                    {loading ? "Saving..." : "Save Product"}
                  </Button>
                </Form.Item>
              </Form>
              <hr />
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default CreateProduct;
