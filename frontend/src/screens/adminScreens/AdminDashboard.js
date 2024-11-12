import React, { useState } from "react";
import { Row, Col } from "antd";
import AdminNav from "../../components/nav/AdminNav";

function AdminDashboard() {
    const [loading, setLoading] = useState(false);

    return (
        <div className="container-fluid">
            <Row>
                <Col span={4}>
                    <AdminNav />
                </Col>
                <Col span={18}>
                    <div className="content" style={{ paddingTop: "60px" }}>
                        {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Admin Dashboard</h4>}
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default AdminDashboard;
