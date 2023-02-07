import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import {
    managePageList,
    adminManagePageList,
    Role,
} from "../../utils/constants";

import "./Navbar.css";
import LogoutButton from "./LogoutButton";

const Navbar = ({ className }) => {
    const auth = useSelector((state) => state.auth);

    const location = useLocation();

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
                                : "text-white"
                        } rounded flex flex-row justify-between items-center my-2 font-semibold`}
                        to={item.path}
                    >
                        <span>{item.name}</span>
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
