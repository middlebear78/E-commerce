import React, { useState } from "react";
import {
  UserOutlined,
  LoginOutlined,
  UserAddOutlined,
  HomeOutlined,
  LogoutOutlined,
  SettingOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Menu, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  const dispatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));

  const auth = getAuth();
  const navigate = useNavigate();
  const [current, setCurrent] = useState("home");

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = async () => {
    await signOut(auth);
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/login");
  };

  return (
    <Row
      className={styles.header}
      justify="space-between"
      align="middle"
      style={{ width: "100%" }}
    >
      <Col flex="1">
        <Menu
          onClick={handleClick}
          selectedKeys={[current]}
          mode="horizontal"
          style={{ display: "flex", justifyContent: "flex-start" }} // Align items to the left
        >
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
        </Menu>
      </Col>

      {!user && (
        <Col flex="1">
          <Menu
            onClick={handleClick}
            selectedKeys={[current]}
            mode="horizontal"
            style={{ display: "flex", justifyContent: "flex-end" }} // Align items to the right
          >
            <Menu.Item key="login" icon={<LoginOutlined />}>
              <Link to="/login">Login</Link>
            </Menu.Item>

            <Menu.Item key="register" icon={<UserAddOutlined />}>
              <Link to="/register">Register</Link>
            </Menu.Item>
          </Menu>
        </Col>
      )}

      {user && (
        <Col flex="1">
          <Menu
            onClick={handleClick}
            selectedKeys={[current]}
            mode="horizontal"
            style={{ display: "flex", justifyContent: "flex-end" }} // Align items to the right
          >
            <Menu.SubMenu
              key="SubMenu"
              icon={<UserOutlined />}
              title={user.email && user.email.split("@")[0]}
            >
              <Menu.Item key="setting:3" icon={<DashboardOutlined />}>
                <Link
                  to={
                    user && user.role === "subscriber"
                      ? "/user/history"
                      : "/admin/dashboard"
                  }
                >
                  Dashboard
                </Link>
              </Menu.Item>

              <Menu.Item key="setting:2" icon={<SettingOutlined />}>
                <Link to="/option2">Settings</Link>
              </Menu.Item>

              <Menu.Item
                key="setting:1"
                onClick={logout}
                icon={<LogoutOutlined />}
              >
                Logout
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Col>
      )}
    </Row>
  );
}

export default Header;
