import React from "react";
import { Row, Col } from "antd";
import UserNav from "../../components/nav/UserNav";

function WishlistScreen() {
  return (
    <div className="container-fluid">
      <Row>
        <Col span={6}>
          <UserNav />
        </Col>
        <Col span={18}>
          <div className="content">
            <h4>User Wishlist Page</h4>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default WishlistScreen;
