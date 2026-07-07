import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import ProductCard from "../components/cards/ProductCard";
import { getProductsByCount } from "../services/productService/productService";

function HomeScreen() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const response = await getProductsByCount(20);
            setProducts(response.data);
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h4 className="text-center p-3 mt-3 mb-4 display-6">New Arrivals</h4>
            {loading ? (
                <div className="text-center p-5">
                    <LoadingOutlined className="text-danger h1" />
                </div>
            ) : (
                <Row gutter={[16, 16]} justify="center">
                    {products.map((product) => (
                        <Col key={product._id}>
                            <ProductCard product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
}

export default HomeScreen;
