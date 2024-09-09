import React, { useState, useEffect } from "react";
import { auth } from "../../fireBase";
import { sendSignInLinkToEmail } from "firebase/auth";
import Notify from "../../utils/notify";
import { MailOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrUpdateUser } from "../../services/userService/userService";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.token) navigate("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const actionCodeSettings = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      Notify.success(
        `Email has been sent to ${email}. check your email to complete your registration.`
      );
      setEmail("");
    } catch (error) {
      Notify.error("Failed to send email. Please try again.");
      console.error("Error sending email:", error);
    }
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <Input
        addonAfter={<MailOutlined />}
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
        placeholder="Enter your email"
      />
      <div className="text-center mt-3">
        <button type="submit" className="btn btn-primary btn-raised mt-3">
          Register
        </button>
      </div>
    </form>
  );

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100 justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card p-4 shadow">
            <h4 className="text-center">Register</h4>
            <small className="text-center pb-4">
              (You need to have a valid email address)
            </small>
            {registerForm()}
          </div>
        </div>
      </div>
    </div>
  );
}
