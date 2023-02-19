import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { Role } from "../../utils/constants";

import "./Navbar.css";
import LogoutButton from "./LogoutButton";
import Badge from "../Icon/Badge";

const Navbar = ({ className }) => {
    const auth = useSelector((state) => state.auth);
    const messagesNotifications = useSelector(
        (state) => state.messagesNotifications
    );

    const location = useLocation();

    const managePageList = [
        { name: "Profile", path: "/manage/profile" },
        { name: "Update Password", path: "/manage/password-update" },
        {
            name: "Chat",
            path: "/manage/chat",
            extra:
                messagesNotifications.length == 0 ? undefined : (
                    <Badge content={messagesNotifications.length} />
                ),
        },
    ];

    const adminManagePageList = [
        ...managePageList,
        { name: "Manage Users", path: "/manage/users" },
        { name: "Power BI Report", path: "/manage/powerbi" },
    ];

    let pageList =
        auth.role === Role.ADMIN ? adminManagePageList : managePageList;

    return (
        <nav
            className={`left bg-slate-900 flex flex-col justify-between px-2 py-4 ${className}`}
        >
            <div className="flex w-full flex-col content-center px-2 mt-5">
                {pageList.map((item) => (
                    <Link
                        key={item.name}
                        className={`nav-item ${
                            location.pathname.startsWith(item.path)
                                ? "bg-gray-100 text-black"
                                : "text-white hover:bg-gray-600"
                        } rounded flex flex-row justify-between items-center my-2 font-semibold`}
                        to={item.path}
                    >
                        <span>{item.name}</span>
                        {item.extra}
                    </Link>
                ))}
            </div>

            <div className="flex w-full flex-col justify-center px-2 mt-5">
                <h3 className="text-md font-semibold">Hi, {auth.name}!</h3>
                <LogoutButton />
            </div>
        </nav>
    );
};

export default Navbar;
