import React, { useState } from "react";
import { useSelector } from "react-redux";
import UserNav from "../../components/nav/UserNav";
import { auth } from "../../fireBase";
import Notify from "../../utils/notify";
import { Button, Input, Row, Col } from "antd";
import { UnlockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getAuth, updatePassword } from "firebase/auth";

function PasswordScreen() {
  const currentPassword = useSelector((state) => state.user.role);

  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  async function handlePasswordChange(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const user = auth.currentUser;
      if (user) {
        await updatePassword(user, newPassword);
        setNewPassword("");
        Notify.success("Password updated");
      } else {
        Notify.error("No user is currently logged in");
      }
    } catch (err) {
      Notify.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  const passwordUpdateForm = () => (
    <form onSubmit={handlePasswordChange}>
      {loading ? (
        <h4 className="text-danger">Loading</h4>
      ) : (
        <h4>Password Update</h4>
      )}
      <br />
      {/* <Input
        addonAfter={<UnlockOutlined />}
        type="password"
        className="form-control"
        value={currentPassword}
        placeholder="current Password"
      /> */}

      <Input
        addonAfter={<UnlockOutlined />}
        type="password"
        className="form-control"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter New Password"
        disabled={loading}
      />
      <br />
      <div className="text-center mt-3">
        <Button
          onClick={handlePasswordChange}
          type="primary"
          shape="round"
          size={"large"}
          className="mb-3"
          icon={<UnlockOutlined />}
          disabled={newPassword.length < 6 || !newPassword || loading}
          style={{ width: "100%" }}
        >
          Change password
        </Button>
        <p>OR</p>

        <Link to="/user/history" className="text-primary">
          Cancel
        </Link>
      </div>
    </form>
  );

  return (
    <div className="container-fluid">
      <Row className="vh-100 m-0">
        <Col span={4} className="d-flex align-items-start p-0">
          <UserNav />
        </Col>
        <Col
          span={18}
          className="d-flex justify-content-center align-items-center p-0"
        >
          <div
            className="card p-4 shadow"
            style={{ maxWidth: "500px", width: "100%" }}
          >
            {passwordUpdateForm()}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default PasswordScreen;
