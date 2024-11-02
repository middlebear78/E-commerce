import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../services/userService/userService";

function AdminPrivateRoute({ element }) {
    const { user } = useSelector((state) => ({ ...state }));
    const [isAdmin, setIsAdmin] = useState(null); // `null` for loading state
    const location = useLocation();

    useEffect(() => {
        if (user && user.token) {
            currentAdmin(user.token)
                .then((res) => {
                    console.log("CURRENT ADMIN RES", res);
                    setIsAdmin(true); // Assuming `res` indicates admin status
                })
                .catch((err) => {
                    console.log("ADMIN ROUTE ERROR", err);
                    setIsAdmin(false);
                });
        } else {
            setIsAdmin(false); // User is not authenticated
        }
    }, [user]);

    if (isAdmin === null || !user || !user.token || !isAdmin) {
        return <LoadingToRedirect />;
    }

    return element;
}
export default AdminPrivateRoute;
