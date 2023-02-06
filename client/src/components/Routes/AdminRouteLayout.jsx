import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { Role } from "../../utils/constants";

const AdminRouteLayout = () => {
    const auth = useSelector((state) => state.auth);

    if (!auth || auth.role != Role.ADMIN) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default AdminRouteLayout;
