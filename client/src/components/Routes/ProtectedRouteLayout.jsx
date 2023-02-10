import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import PageWrapper from "../PageWrapper";
import Navbar from "../Nav/NavBar";
import Icon from "../Icon";

const ProtectedRouteLayout = () => {
    const auth = useSelector((state) => state.auth);
    const [settingNav, setSettingNav] = useState("");

    const showNav = () => {
        return settingNav ? setSettingNav("") : setSettingNav("show");
    };

    if (!auth) {
        return <Navigate to="/" />;
    }

    return (
        <PageWrapper className="flex flex-row flex-wrap p-0">
            <Navbar className={settingNav} />

            {/* Hamburger button on mobile to show nav */}
            <button
                onClick={showNav}
                className="menu-btn bg-slate-900 rounded-br-lg"
                type="button"
                aria-label="Menu"
            >
                {settingNav === "" ? (
                    <Icon icon={["fas", "bars"]} size="lg" color="white" />
                ) : (
                    <Icon icon={["fas", "times"]} size="lg" color="white" />
                )}
            </button>

            <div className="right">
                <Outlet />
            </div>
        </PageWrapper>
    );
};

export default ProtectedRouteLayout;
