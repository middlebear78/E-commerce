import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form } from "antd";
import AdminNav from "../../../components/nav/AdminNav";
import notify from "../../../utils/notify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../services/productService/productService";
import CreateProductForm from "../../../components/forms/CreateProductForm";
import {
  getAllCategories,
  getCategorySubs,
} from "../../../services/categoryService/categoryService";

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
  color: "",
  brand: "",
};

const colors = ["black", "white", "silver", "blue", "brown"];
const brands = ["Samsung", "Lenovo", "Apple", "Microsoft", "Nvidia"];

function CreateProduct() {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSubs] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  const [form] = Form.useForm();

  useEffect(() => {
    console.log("Fetching categories...");
    categoriesList();
  }, []);

  const categoriesList = async () => {
    try {
      const response = await getAllCategories();
      console.log("Categories fetched:", response.data);
      setValues((prevValues) => ({
        ...prevValues,
        categories: response.data,
      }));
    } catch (err) {
      console.log("Error fetching categories:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target || e;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleCategoryChange = async (categoryId) => {
    try {
      console.log("Selected Category ID:", categoryId);

      setValues({ ...values, category: categoryId });

      // Fetch the subcategories based on the selected category
      const res = await getCategorySubs(categoryId);
      console.log("Response from API:", res); // Log the entire response

      // Check if subcategories were found
      if (res.data.length === 0) {
        console.warn("No subcategories found for this category.");
      } else {
        console.log("Subcategories options by category id:", res.data);
        // Update the subOptions state with the fetched data
        setSubOptions(res.data);
      }
    } catch (error) {
      // Handle errors (e.g., log the error or display a message)
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    createProduct(values, user.token)
      .then((res) => {
        setLoading(false);
        notify.success(`${res.data.title} is created`);
        form.resetFields();
        categoriesList();

        setValues((prevValues) => ({
          ...initialState,
          categories: prevValues.categories,
        }));
      })
      .catch((err) => {
        setLoading(false);
        notify.error(err.response?.data.err || "An unexpected error occurred");
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
              <CreateProductForm
                form={form}
                values={values}
                loading={loading}
                handleChange={handleChange}
                handleCategoryChange={handleCategoryChange}
                handleSubmit={handleSubmit}
                colors={colors}
                brands={brands}
                categories={values.categories}
                subOptions={subOptions}
                showSub={showSub}
                setValues={setValues}
              />
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default CreateProduct;
