import React, { useState } from "react";
import { Row, Col, Form, Card, Input } from "antd";
import AdminNav from "../../../components/nav/AdminNav";
import notify from "../../../utils/notify";

function CreateSubCategory() {
  const [loading, setLoading] = useState(false);

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
          ></Card>
        </div>
      </Col>
    </Row>
  );
}

export default CreateSubCategory;
