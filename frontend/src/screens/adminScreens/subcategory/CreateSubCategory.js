import React, { useState, useEffect } from "react";
import { Row, Col, Form, Card, Select } from "antd";
import AdminNav from "../../../components/nav/AdminNav";
import CreateSubCategoryForm from "../../../components/forms/CreateSubCategoryForm";
import { useSelector } from "react-redux";
import {
  getAllSubCategories,
  createSubCategory,
  deleteSubCategory,
} from "../../../services/subcategoryservice/subCategoryService";
import Notify from "../../../utils/notify";
import SearchFilter from "../../../components/forms/SearchFilter";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../../services/categoryService/categoryService";

function CreateSubCategory() {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [form] = Form.useForm();
  const [keyWord, setKeyword] = useState("");
  const [categories, setCategories] = useState([]);

  const { Option } = Select;

  useEffect(() => {
    subCategoriesList();
    categoriesList();
  }, []);

  const subCategoriesList = async () => {
    try {
      const response = await getAllSubCategories();
      setSubCategories(response.data);
    } catch (err) {
      console.log(err);
    }
  };

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
    console.log("Submitting subcategory with values:", values);
    console.log("Selected category:", category);
    createSubCategory(
      { name: values.subCategoryName, parent_category: category },
      user.token
    )
      .then((res) => {
        setLoading(false);
        Notify.success(`${res.data.name} is created.`);
        setName("");
        form.resetFields();
        subCategoriesList();
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.status === 400) {
          Notify.error(err.response.data);
        } else {
          Notify.error("An unexpected error occurred.");
        }
      });
  };

  const handleDelete = async (slug) => {
    const answer = window.confirm("Delete Sub Category?");
    if (answer) {
      try {
        setLoading(true);
        const response = await deleteSubCategory(slug, user.token);
        Notify.success(`Sub Category ${response.data.name} has been deleted.`);
        subCategoriesList();
      } catch (err) {
        setLoading(false);
        if (err.response.status === 400) {
          console.error("Error deleting Sub category:", err.response.data);
          Notify.error("Failed to delete Sub category");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const SearchedSubCategory = (keyWord) => (subcategory) =>
    subcategory.name.toLowerCase().includes(keyWord) ||
    subcategory.parent_category.toLowerCase().includes(keyWord);

  const handleCategoryChange = (value) => {
    setCategory(value);
    console.log("Category changed:", value); // Debugging line
  };

  return (
    <Row gutter={16}>
      <Col span={4}>
        <AdminNav />
      </Col>
      <Col span={18}>
        <div className="content">
          <Card
            title={loading ? "Loading..." : "Create Sub Category"}
            style={{
              width: "100%",
              maxWidth: 600,
              margin: "100px auto 0 auto",
            }}
          >
            <div className="form-group">
              <label style={{ marginBottom: "8px", display: "block" }}>
                Category
              </label>
              <Select
                showSearch
                placeholder="Select a parent category"
                optionFilterProp="children"
                onChange={handleCategoryChange}
                style={{ width: "100%", height: "40px" }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {categories.length > 0 &&
                  categories.map((category) => (
                    <Option key={category._id} value={category._id}>
                      {category.name}
                    </Option>
                  ))}
              </Select>
            </div>

            <CreateSubCategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
              loading={loading}
              form={form}
            />
            <SearchFilter keyWord={keyWord} setKeyword={setKeyword} />
            <hr />
            {subCategories
              .filter(SearchedSubCategory(keyWord))
              .map((subcategory) => (
                <div
                  className="alert alert-secondary"
                  key={subcategory._id}
                  style={{ fontWeight: "bold" }}
                >
                  {subcategory.name}
                  <span
                    onClick={() => handleDelete(subcategory.slug)}
                    className="btn btn-sm float-end"
                  >
                    Delete <DeleteOutlined className="text-danger" />
                  </span>
                  <Link to={`/admin/subcategory/${subcategory.slug}`}>
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
  );
}

export default CreateSubCategory;
