import React from "react";
import { Row, Col } from "antd";
import AdminNav from "../../components/nav/AdminNav";

function AdminDashboard() {
  return (
    <div className="container-fluid">
      <Row>
        <Col span={6}>
          <AdminNav />
        </Col>
        <Col span={18}>
          <div className="content">
            <h4>Admin Dashboard</h4>
          </div>
        </Col>
      </Row>
    </div>
  );
}
export default AdminDashboard;
