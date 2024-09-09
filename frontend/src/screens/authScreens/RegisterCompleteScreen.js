import React, { useState, useEffect } from "react";
import { auth } from "../../fireBase";
import {
  isSignInWithEmailLink,
  signInWithEmailLink,
  updatePassword,
} from "firebase/auth";
import Notify from "../../utils/notify";
import { useNavigate } from "react-router-dom";
import { MailOutlined, UnlockOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { createOrUpdateUser } from "../../services/userService/userService";

export default function RegisterCompleteScreen({ history }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForSignIn") || "");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validate
    if (!email || !password) {
      Notify.error(`Email and Password are required.`);
      return;
    }
    if (password.length < 6) {
      Notify.error(`Password must be at least 6 characters long.`);
      return;
    }

    try {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        const result = await signInWithEmailLink(
          auth,
          email,
          window.location.href
        );
        console.log("RESULT", result);
        if (result.user.emailVerified) {
          window.localStorage.removeItem("emailForSignIn");

          //   get user token id
          let user = auth.currentUser;
          await updatePassword(user, password); //updatePassword method comes with firebase
          const idTokenResult = await user.getIdTokenResult(); //getTokenIdResult method comes with firebase

          //  redux store
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
            })

            .catch((err) => console.log(err));
          // redirect
          Notify.success(`Registration Complete. Welcome.`);
          navigate("/");
        }
      }
    } catch (error) {
      Notify.error(`Error during sign-in: ${error.message}`);
    }
  };

  const completeRegisterForm = () => (
    <form onSubmit={handleSubmit}>
      <Input
        addonAfter={<MailOutlined />}
        type="email"
        className="form-control mb-4"
        value={email}
        readOnly
      />
      <Input
        addonAfter={<UnlockOutlined />}
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoFocus
      />

      <div className="text-center mt-3">
        <button type="submit" className="btn btn-primary btn-raised mt-3">
          Complete Registration
        </button>
      </div>
    </form>
  );

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100 justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card p-4 shadow">
            <h4 className="text-center">Registration Complete</h4>
            <small className="text-center pb-4">{/* Optional message */}</small>
            {completeRegisterForm()}
          </div>
        </div>
      </div>
    </div>
  );
}
