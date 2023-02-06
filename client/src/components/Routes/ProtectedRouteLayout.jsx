import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import PageWrapper from "../PageWrapper";
import Navbar from "../Nav/NavBar";

const ProtectedRouteLayout = () => {
    const auth = useSelector((state) => state.auth);

    if (!auth) {
        return <Navigate to="/" />;
    }

    return (
        <PageWrapper className="flex flex-row flex-wrap">
            <Navbar />
            <div className="right">
                <Outlet />
            </div>
        </PageWrapper>
    );
};

export default ProtectedRouteLayout;
