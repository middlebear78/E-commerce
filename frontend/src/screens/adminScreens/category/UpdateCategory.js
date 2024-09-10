import React, { useState, useEffect } from "react";
import { Row, Col, Form, Card } from "antd";
import AdminNav from "../../../components/nav/AdminNav";
import notify from "../../../utils/notify";
import {
  updateCategory,
  getOneCategory,
} from "../../../services/categoryService/categoryService";
import { useSelector } from "react-redux";
import UpdateCategoryForm from "../../../components/forms/UpdateCategoryForm";
import { useNavigate, useParams } from "react-router-dom";
import Notify from "../../../utils/notify";

function UpdateCategory() {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [initialName, setInitialName] = useState("");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); // Create form instance here
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadCategory();
  }, [slug]);

  const loadCategory = () =>
    getOneCategory(slug)
      .then((res) => {
        setInitialName(res.data.name);
        setName(res.data.name);

        form.setFieldsValue({ categoryName: res.data.name });
      })
      .catch((err) => {
        Notify.error("Failed to load category.");
        console.log(err);
      });

  const handleSubmit = (values) => {
    setLoading(true);
    updateCategory(slug, { name: values.categoryName }, user.token)
      .then((res) => {
        setLoading(false);
        notify.success(`${res.data.name} is updated.`);
        setName(""); // Reset name state after successful update
        form.resetFields(); // Reset form fields
        navigate("/admin/category"); // Navigate to categories list
      })
      .catch((err) => {
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
              title={loading ? "Loading..." : "Update Category"}
              style={{
                width: "100%",
                maxWidth: 600,
                margin: "100px auto 0 auto",
              }}
            >
              <UpdateCategoryForm
                handleSubmit={handleSubmit}
                name={name}
                setName={setName}
                loading={loading}
                form={form}
                currentCategory={initialName}
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
