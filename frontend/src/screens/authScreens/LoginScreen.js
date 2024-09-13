import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../fireBase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Notify from "../../utils/notify";
import { Button, Input } from "antd";
import {
  MailOutlined,
  GoogleOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { createOrUpdateUser } from "../../services/userService/userService";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) navigate("/");
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const roleBasedRedirect = (res) => {
    console.log("User Role:", res.data.role);
    if (res.data.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/history");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      // console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult(); //get the token

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          console.log("CREATE OR UPDATE RES", res);
          dispatch({
            type: "USER_LOGGED_IN",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));

      // Notify.success(`Login Complete. Welcome.`);
    } catch (error) {
      console.log(error.code);
      console.error("Login failed:", error.message);
      Notify.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          console.log("CREATE OR UPDATE RES", res);
          dispatch({
            type: "USER_LOGGED_IN",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          roleBasedRedirect(res);
        })

        .catch();

      Notify.success(`Login Complete. Welcome.`);
    } catch (error) {
      console.error("Login failed:", error.message);
      Notify.error(error.message);
      setLoading(false);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <Input
        addonAfter={<MailOutlined />}
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
        placeholder="Email"
      />

      <br />

      <Input
        addonAfter={<UnlockOutlined />}
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <br />
      <div className="text-center mt-3">
        <Button
          onClick={handleLogin}
          type="primary"
          shape="round"
          size={"large"}
          className="mb-3"
          icon={<MailOutlined />}
          disabled={!email || password.length < 6}
          style={{ width: "100%" }}
        >
          Login with Email/Password
        </Button>
        <p>OR</p>

        <Button
          onClick={googleLogin}
          type="primary"
          shape="round"
          size={"large"}
          className="mb-3"
          danger
          icon={<GoogleOutlined />}
          style={{ width: "100%" }}
        >
          Login with Google
        </Button>

        <Link to="/forgot/password" className="text-primary">
          Forgot Password?
        </Link>
      </div>
    </form>
  );

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100 justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card p-4 shadow">
            {/* <h4 className="text-center">Login</h4> */}
            {loading ? (
              <h4 className="text-center">Loading...</h4>
            ) : (
              <h4 className="text-center">Login</h4>
            )}
            <small className="text-center pb-4"></small>
            {loginForm()}
          </div>
        </div>
      </div>
    </div>
  );
}
