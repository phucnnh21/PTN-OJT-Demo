import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
    managePageList,
    adminManagePageList,
    Role,
} from "../../utils/constants";
import { logout } from "../../stores/slices/authSlice";

import "./Navbar.css";

const Navbar = ({ className }) => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

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
                        className={`nav-item bg-gray-100 text-black rounded flex flex-row justify-between items-center my-2 font-semibold`}
                        to={item.path}
                    >
                        <span>{item.name}</span>
                    </Link>
                ))}
            </div>

            <div className="flex w-full flex-col justify-center px-2 mt-5">
                <h3 className="text-md font-semibold">Hi, {auth.name}!</h3>
                <button
                    key="logout"
                    className={`nav-item bg-red-100 text-black rounded flex flex-row justify-between items-center my-2 font-semibold`}
                    onClick={() => {
                        dispatch(logout());
                    }}
                >
                    <span>Logout</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
