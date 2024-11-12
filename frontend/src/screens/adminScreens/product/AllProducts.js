import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount } from "../../../services/productService/productService";
import AdminProductCard from "../../../components/cards/AdminProductCard";

function AllProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAllProducts();
    }, []);

    const loadAllProducts = async () => {
        setLoading(true);
        try {
            const response = await getProductsByCount(10);
            // console.log(response.data);
            setProducts(response.data);
        } catch (err) {
            console.log("Error fetching products:", err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid">
            <Row>
                <Col span={4}>
                    <AdminNav />
                </Col>
                <Col span={18}>
                    <div className="content" style={{ paddingTop: "60px" }}>
                        {loading ? <h4 className="text-danger">Loading...</h4> : <h4>All Products</h4>}
                        <Row gutter={[16, 32]}>
                            {products.map((product) => (
                                <Col xs={24} sm={12} md={8} lg={6} key={product._id}>
                                    <AdminProductCard product={product} />
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
export default AllProducts;