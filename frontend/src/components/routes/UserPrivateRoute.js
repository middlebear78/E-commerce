import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

function UserPrivateRoute({ element, ...rest }) {
  const { user } = useSelector((state) => ({ ...state }));
  
  const location = useLocation();

  return user && user.token ? element : <LoadingToRedirect />;
}

export default UserPrivateRoute;
