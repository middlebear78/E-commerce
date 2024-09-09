import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import LoginScreen from "./screens/authScreens/LoginScreen";
import RegisterScreen from "./screens/authScreens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterCompleteScreen from "./screens/authScreens/RegisterCompleteScreen";
import HistoryScreen from "./screens/userScreens/HistoryScreen";
import PasswordScreen from "./screens/userScreens/PasswordScreen";
import WishlistScreen from "./screens/userScreens/WishlistScreen";
import ForgotPassword from "./screens/authScreens/ForgotPassword";
import AdminDashboard from "./screens/adminScreens/AdminDashboard";
import CreateCategory from "./screens/adminScreens/category/CreateCategory";

import UserPrivateRoute from "./components/routes/UserPrivateRoute";
import AdminPrivateRoute from "./components/routes/AdminPrivateRoute";

import Header from "./components/nav/Header";

import Notify from "./utils/notify";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { auth } from "./fireBase";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import { currentUser } from "./services/userService/userService";

function App() {
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
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
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch, auth]);

  return (
    <>
      <Notify.Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/register/complete" element={<RegisterCompleteScreen />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />
        <Route
          path="/user/history"
          element={<UserPrivateRoute element={<HistoryScreen />} />}
        />
        <Route
          path="/user/wishlist"
          element={<UserPrivateRoute element={<WishlistScreen />} />}
        />
        <Route
          path="/user/password"
          element={<UserPrivateRoute element={<PasswordScreen />} />}
        />
        <Route
          path="/admin/dashboard"
          element={<AdminPrivateRoute element={<AdminDashboard />} />}
        />
        <Route
          path="/admin/category"
          element={<AdminPrivateRoute element={<CreateCategory />} />}
        />
      </Routes>
    </>
  );
}

export default App;
