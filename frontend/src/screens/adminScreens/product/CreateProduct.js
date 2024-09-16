import React, { useState } from "react";
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
  subcategory: "",
  quantity: "",
  sold: "",
  images: "",
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
  const { user } = useSelector((state) => ({ ...state }));

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
    colors,
    color,
    brands,
    brand,
  } = values;

  const handleChange = (value, fieldName) => {
    if (
      fieldName === "shipping" ||
      fieldName === "color" ||
      fieldName === "brand"
    ) {
      setValues({ ...values, [fieldName]: value });
      console.log(fieldName, " ------- ", value);
    } else {
      //
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    console.log(name, " ------- ", value);
  };

  const handleSubmit = (e) => {
    // e.preventDefault(); - antDesign dont need this
    setLoading(true);
    createProduct(values, user.token)
      .then((res) => {
        console.log("Product Created Successfully", res.data);
        setLoading(false);
        notify.success(`${res.data.title} is created`);
        setValues(initialState);
        form.resetFields();
        // productList()
      })
      .catch((err) => {
        console.log("Error creating product:", err);
        setLoading(false);
        if (err.response && err.response.status === 400) {
          notify.error(err.response.data);
        } else {
          notify.error("An unexpected error occurred.");
        }
      });
  };

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
                onFinish={handleSubmit}
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
                    name="title"
                    placeholder="Enter product title"
                    onChange={handleInputChange}
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
                    name="description"
                    placeholder="Enter product description"
                    onChange={handleInputChange}
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
                    name="price"
                    placeholder="Enter product price"
                    onChange={handleInputChange}
                    value={price}
                  />
                </Form.Item>
                <Form.Item
                  label="Category"
                  name="category"
                  rules={[
                    {
                      required: false,
                      message: "Please input the product category",
                    },
                  ]}
                >
                  <Input
                    name="category"
                    placeholder="Enter product category"
                    onChange={handleInputChange}
                    value={category}
                  />
                </Form.Item>
                <Form.Item
                  label="Sub Category"
                  name="subcategory"
                  rules={[
                    {
                      required: false,
                      message: "Please input the product Sub category",
                    },
                  ]}
                >
                  <Input
                    name="subcategory"
                    placeholder="Enter product Sub category"
                    onChange={handleInputChange}
                    value={subcategory}
                  />
                </Form.Item>
                <Form.Item
                  label="Quantity"
                  name="quantity"
                  rules={[
                    {
                      required: true,
                      message: "Please input product quantity",
                    },
                  ]}
                >
                  <Input
                    name="quantity"
                    type="number"
                    placeholder="Enter product quantity"
                    onChange={handleInputChange}
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
                    name="sold"
                    placeholder="Enter product sold number"
                    onChange={handleInputChange}
                    value={sold}
                  />
                </Form.Item>
                <Form.Item
                  label="Images"
                  name="images"
                  rules={[
                    {
                      required: false,
                      message: "Please add the product images",
                    },
                  ]}
                >
                  <Input
                    name="images"
                    placeholder="Add product images"
                    onChange={handleInputChange}
                    value={images}
                  />
                </Form.Item>
                <Form.Item
                  label="Shipping"
                  name="shipping"
                  rules={[
                    { required: true, message: "Please add product shipping" },
                  ]}
                >
                  <Select
                    name="shipping"
                    showSearch
                    placeholder="Select shipping option"
                    optionFilterProp="children"
                    onChange={(value) => handleChange(value, "shipping")}
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
                    { required: true, message: "Please add product color" },
                  ]}
                >
                  <Select
                    name="color"
                    showSearch
                    placeholder="Select a product color"
                    optionFilterProp="children"
                    onChange={(value) => handleChange(value, "color")}
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
                    { required: false, message: "Please add product brand" },
                  ]}
                >
                  <Select
                    name="brand"
                    showSearch
                    placeholder="Select a product brand"
                    optionFilterProp="children"
                    onChange={(value) => handleChange(value, "brand")}
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
                    disabled={loading}
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
