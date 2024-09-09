import React from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  ProductOutlined,
  ProductFilled,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  TagsOutlined,
  TagsFilled,
  LockOutlined,
} from "@ant-design/icons";

function AdminNav() {
  const location = useLocation();

  const getSelectedKey = () => {
    if (location.pathname.includes("/admin/dashboard")) {
      return "1";
    } else if (location.pathname.includes("/admin/product")) {
      return "2";
    } else if (location.pathname.includes("/admin/products")) {
      return "3";
    } else if (location.pathname.includes("/admin/category")) {
      return "4";
    } else if (location.pathname.includes("/admin/sub")) {
      return "5";
    } else if (location.pathname.includes("/admin/coupons")) {
      return "6";
    } else if (location.pathname.includes("/user/password")) {
      return "7";
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
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/admin/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<ProductOutlined />}>
          <Link to="/admin/product">Product</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<ProductFilled />}>
          <Link to="/admin/products">Products</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<MenuFoldOutlined />}>
          <Link to="/admin/category">Category</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<MenuUnfoldOutlined />}>
          <Link to="/admin/sub">Sub Category</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<TagsFilled />}>
          <Link to="/admin/coupons">Coupons</Link>
        </Menu.Item>
        <Menu.Item key="7" icon={<LockOutlined />}>
          <Link to="/user/password">Password</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default AdminNav;
