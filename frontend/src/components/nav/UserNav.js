import React from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { UserOutlined, LockOutlined, HeartOutlined } from "@ant-design/icons";

function UserNav() {
  const location = useLocation();

  const getSelectedKey = () => {
    if (location.pathname.includes("/user/history")) {
      return "1";
    } else if (location.pathname.includes("/user/password")) {
      return "2";
    } else if (location.pathname.includes("/user/wishlist")) {
      return "3";
    }
    return "1";
  };

  return (
    <div style={{ width: 180 }}>
      <Menu
        mode="inline"
        theme="light"
        defaultSelectedKeys={[getSelectedKey()]}
      >
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/user/history">History</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<LockOutlined />}>
          <Link to="/user/password">Password</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<HeartOutlined />}>
          <Link to="/user/wishlist">Wishlist</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default UserNav;
