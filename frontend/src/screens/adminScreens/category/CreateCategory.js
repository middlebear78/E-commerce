import React, { useState, useEffect } from "react";
import { Row, Col, Form, Card, Input } from "antd";
import AdminNav from "../../../components/nav/AdminNav";
import notify from "../../../utils/notify";
import {
  createCategory,
  getAllCategories,
  deleteCategory,
} from "../../../services/categoryService/categoryService";
import { useSelector } from "react-redux";
import CreateCategoryForm from "../../../components/forms/CreateCategoryForm";
import { Link } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Notify from "../../../utils/notify";
import SearchFilter from "../../../components/forms/SearchFilter";

function CreateCategory() {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm(); // Create form instance here
  const [keyWord, setKeyword] = useState("");

  useEffect(() => {
    categoriesList();
  }, []);

  const categoriesList = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (values) => {
    setLoading(true);
    createCategory({ name: values.categoryName }, user.token)
      .then((res) => {
        setLoading(false);
        notify.success(`${res.data.name} is created.`);
        setName("");
        form.resetFields();
        categoriesList();
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
  const handleDelete = async (slug) => {
    const answer = window.confirm("Delete Category?");
    if (answer) {
      try {
        setLoading(true);
        const response = await deleteCategory(slug, user.token);
        Notify.success(`Category ${response.data.name} has been deleted.`);
        categoriesList();
      } catch (err) {
        if (err.response.status === 400) {
          console.error("Error deleting category:", err.response.data);
          Notify.error("Failed to delete category");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const SearchedCategory = (keyWord) => (category) =>
    category.name.toLowerCase().includes(keyWord);

  return (
    <div className="container-fluid">
      <Row gutter={16}>
        <Col span={4}>
          <AdminNav />
        </Col>
        <Col span={18}>
          <div className="content">
            <Card
              title={loading ? "Loading..." : "Create Category"}
              style={{
                width: "100%",
                maxWidth: 600,
                margin: "100px auto 0 auto",
              }}
            >
              {/* Passing the form instance to CreateCategoryForm */}
              <CreateCategoryForm
                handleSubmit={handleSubmit}
                name={name}
                setName={setName}
                loading={loading}
                form={form} // im Passing the form instance here
              />
              {/* step 2  - search field */}
              <SearchFilter keyWord={keyWord} setKeyword={setKeyword} />

              <hr />

              {categories.filter(SearchedCategory(keyWord)).map((category) => (
                <div
                  className="alert alert-secondary"
                  key={category._id}
                  style={{ fontWeight: "bold" }}
                >
                  {category.name}
                  <span
                    onClick={() => handleDelete(category.slug)}
                    className="btn btn-sm float-end"
                  >
                    Delete <DeleteOutlined className="text-danger" />
                  </span>
                  <Link to={`/admin/category/${category.slug}`}>
                    <span className="btn btn-sm float-end">
                      Edit <EditOutlined className="text-warning" />
                    </span>
                  </Link>
                </div>
              ))}
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default CreateCategory;
