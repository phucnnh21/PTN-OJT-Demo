import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthRouteLayout = () => {
    const auth = useSelector((state) => state.auth);

    if (auth) {
        return <Navigate to="/manage" />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
};

export default AuthRouteLayout;
