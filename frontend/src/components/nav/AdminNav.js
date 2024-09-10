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
import styles from "./AdminNav.module.css"; // Import the CSS module

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
    } else if (location.pathname.includes("/admin/subcategory")) {
      return "5";
    } else if (location.pathname.includes("/admin/coupons")) {
      return "6";
    } else if (location.pathname.includes("/user/password")) {
      return "7";
    }
    return "1";
  };

  return (
    <div className={styles.navContainer}>
      <Menu
        mode="inline"
        theme="light"
        defaultSelectedKeys={[getSelectedKey()]}
        className={styles.menu}
      >
        <Menu.Item
          key="1"
          icon={<DashboardOutlined />}
          className={styles.menuItem}
        >
          <Link to="/admin/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<ProductOutlined />}
          className={styles.menuItem}
        >
          <Link to="/admin/product">Product</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<ProductFilled />} className={styles.menuItem}>
          <Link to="/admin/products">Products</Link>
        </Menu.Item>
        <Menu.Item
          key="4"
          icon={<MenuFoldOutlined />}
          className={styles.menuItem}
        >
          <Link to="/admin/category">Category</Link>
        </Menu.Item>
        <Menu.Item
          key="5"
          icon={<MenuUnfoldOutlined />}
          className={styles.menuItem}
        >
          <Link to="/admin/subcategory">Sub Category</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<TagsFilled />} className={styles.menuItem}>
          <Link to="/admin/coupons">Coupons</Link>
        </Menu.Item>
        <Menu.Item key="7" icon={<LockOutlined />} className={styles.menuItem}>
          <Link to="/user/password">Password</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default AdminNav;
