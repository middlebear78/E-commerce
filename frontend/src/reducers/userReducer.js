import React from "react";

function userReducer(state = null, action) {
  switch (action.type) {
    case "USER_LOGGED_IN":
      return action.payload;

    case "LOGOUT":
      return action.payload;

    default:
      return state;
  }
}

export default userReducer;
