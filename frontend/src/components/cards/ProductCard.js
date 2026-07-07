import React from "react";
import { Card } from "antd";
import noImage from "../../assets/images/no-image-icon-23500.jpg";

const { Meta } = Card;

const ProductCard = ({ product }) => {
    const { title, description, price, brand, images } = product;
    const imageUrl = images && images.length > 0 ? images[0].url : noImage;
    return (
        <Card
            hoverable
            style={{ width: 280 }}
            cover={
                <img
                    className="p-1"
                    alt="product"
                    src={imageUrl}
                    style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                    }}
                />
            }
        >
            <Meta
                title={
                    <div className="d-flex justify-content-between">
                        <span>{title}</span>
                        <span className="text-success">${price}</span>
                    </div>
                }
                description={
                    <>
                        {brand && <div className="fw-bold">{brand}</div>}
                        {description && (description.length > 50 ? `${description.slice(0, 50)}...` : description)}
                    </>
                }
            />
        </Card>
    );
};

export default ProductCard;
