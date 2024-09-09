import React, { useState, useEffect } from "react";
import { Row, Col, Form, Card } from "antd";
import AdminNav from "../../../components/nav/AdminNav";
import notify from "../../../utils/notify";
import {
  updateCategory,
  getOneCategory,
} from "../../../services/categoryService/categoryService";
import { useSelector } from "react-redux";
import CreateCategoryForm from "../../../components/forms/CreateCategoryForm";
import { useNavigate, useParams } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Notify from "../../../utils/notify";

function UpdateCategory() {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm(); // Create form instance here
  const params = useParams();

  useEffect(() => {
    console.log(params);
  }, []);

  //   const handleSubmit = (values) => {
  //     setLoading(true);
  //     createCategory({ name: values.categoryName }, user.token)
  //       .then((res) => {
  //         setLoading(false);
  //         notify.success(`${res.data.name} is created.`);
  //         setName(""); // Reset name state after successful creation
  //         form.resetFields(); // Reset form fieldscategoriesList(); // Refresh the categories list
  //       })
  //       .catch((err) => {
  //         setLoading(false);
  //         if (err.response && err.response.status === 400) {
  //           notify.error(err.response.data);
  //         } else {
  //           notify.error("An unexpected error occurred.");
  //         }
  //       });
  //   };

  return (
    <div className="container-fluid">
      <Row gutter={16}>
        <Col span={4}>
          <AdminNav />
        </Col>
        <Col span={18}>
          <div className="content">
            <Card
              title={loading ? "Loading..." : "Update Category"}
              style={{
                width: "100%",
                maxWidth: 600,
                margin: "100px auto 0 auto",
              }}
            >
              {/* Passing the form instance to CreateCategoryForm */}
              <CreateCategoryForm
                // handleSubmit={handleSubmit}
                name={name}
                setName={setName}
                loading={loading}
                form={form} // Passing the form instance here
              />
              <hr />
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default UpdateCategory;
