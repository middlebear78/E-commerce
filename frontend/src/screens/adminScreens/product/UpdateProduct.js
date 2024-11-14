import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form } from "antd";
import AdminNav from "../../../components/nav/AdminNav";
import notify from "../../../utils/notify";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { getOneProduct } from "../../../services/productService/productService";

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

function UpdateProduct() {
    const [values, setValues] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));
    const { slug } = useParams();

    useEffect(() => {
        if (slug) {
            loadProduct(slug);
        }
    }, [slug]);

    const loadProduct = async (slug) => {
        setLoading(true);
        try {
            const response = await getOneProduct(slug);
            const productData = response.data;
            // console.log("product Data: ", JSON.stringify(productData));
            setValues({ ...values, ...productData });
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
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
                            title={loading ? <LoadingOutlined className="text-danger h1" /> : "Update Product"}
                            style={{
                                width: "100%",
                                maxWidth: 1200,
                                margin: "100px auto 0 auto",
                            }}
                        >
                            <p>{JSON.stringify(values)}</p>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default UpdateProduct;
