import React from "react";
import { Row, Col } from "antd";
import UserNav from "../../components/nav/UserNav";

function HistoryScreen() {
  return (
    <div className="container-fluid">
      <Row>
        <Col span={6}>
          <UserNav />
        </Col>
        <Col span={18}>
          <div className="content">
            <h4>User History Page</h4>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default HistoryScreen;
