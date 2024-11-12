import React from "react";
import { Card } from "antd";

const { Meta } = Card;

const AdminProductCard = ({ product }) => {
    const { title, description, images } = product;
    const imageUrl = images && images.length > 0 ? images[0].url : "/no-image-icon-23500.jpg";
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
                title={title}
                description={description.length > 50 ? `${description.slice(0, 50)}...` : description}
            />
        </Card>
    );
};

export default AdminProductCard;
