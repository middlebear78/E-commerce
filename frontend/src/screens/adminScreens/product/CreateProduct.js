import React, { useState, useEffect } from "react";
import { Row, Col, Form, Card, Button, Input } from "antd";
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
                    // onChange={(e) => setName(e.target.value)}
                  />
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
