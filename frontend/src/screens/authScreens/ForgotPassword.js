import React, { useEffect, useState } from "react";
import { auth } from "../../fireBase";
import { sendPasswordResetEmail } from "firebase/auth";
import Notify from "../../utils/notify";
import { Button, Input } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) navigate("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const actionCodeSettings = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
      handleCodeInApp: true,
    };

    try {
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      Notify.success(`Password reset email sent successfully to ${email}.`);
      setEmail("");
      navigate("/login");
    } catch (error) {
      Notify.error("Failed to send password reset email. Please try again.");
      console.error("Error sending password reset email:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container col-md-6 offset-md-3 p-5">
      {loading ? <h4>Loading...</h4> : <h4>Forgot Password</h4>}
      <form onSubmit={handleSubmit}>
        <Input
          addonAfter={<MailOutlined />}
          className="form-control mt-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Type your email"
          autoFocus
        />
        <Button
          type="primary"
          htmlType="submit"
          className="btn-raised mt-3"
          loading={loading}
          disabled={!email}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default ForgotPassword;
