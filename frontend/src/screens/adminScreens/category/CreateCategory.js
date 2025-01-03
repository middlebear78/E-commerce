import React, { useState, useEffect } from "react";
import { Row, Col, Form, Card } from "antd";
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
    console.log("Fetching categories...");
    categoriesList();
  }, []);

  const categoriesList = async () => {
    try {
      const response = await getAllCategories();
      console.log("Categories fetched:", response.data);
      setCategories(response.data);
    } catch (err) {
      console.log("Error fetching categories:", err);
    }
  };

  const handleSubmit = (values) => {
    console.log("Form submitted with values:", values);
    setLoading(true);
    createCategory({ name: values.categoryName }, user.token)
      .then((res) => {
        console.log("Category created successfully:", res.data);
        setLoading(false);
        notify.success(`${res.data.name} is created.`);
        setName("");
        form.resetFields();
        categoriesList();
      })
      .catch((err) => {
        console.log("Error creating category:", err);
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
        console.log("Deleting category with slug:", slug);
        setLoading(true);
        const response = await deleteCategory(slug, user.token);
        console.log("Category deleted:", response.data);
        Notify.success(`Category ${response.data.name} has been deleted.`);
        categoriesList();
      } catch (err) {
        console.log("Error deleting category:", err);
        if (err.response && err.response.status === 400) {
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
                form={form} // Passing the form instance here
              />

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
