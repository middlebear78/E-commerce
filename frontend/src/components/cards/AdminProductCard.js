import React from "react";
import { Card } from "antd";
import noImage from "../../assets/images/no-image-icon-23500.jpg";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;

const AdminProductCard = ({ product, handleDelete }) => {
    const { title, description, images, slug } = product;
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
            actions={[
                <Link to={`/admin/product/${slug}`}>
                    <EditOutlined className="text-warning" />
                </Link>,
                <DeleteOutlined className="text-danger" onClick={() => handleDelete(slug)} />,
            ]}
        >
            <Meta
                title={title}
                description={description.length > 50 ? `${description.slice(0, 50)}...` : description}
            />
        </Card>
    );
};

export default AdminProductCard;
