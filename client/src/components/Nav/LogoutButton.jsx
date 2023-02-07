import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { logout } from "../../stores/slices/authSlice";

const LogoutButton = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        Swal.fire({
            title: `Do you want to Logout?`,
            showDenyButton: true,
            confirmButtonText: "Cancel",
            denyButtonText: "Logout",
        }).then((result) => {
            if (result.isConfirmed) {
            } else if (result.isDenied) {
                dispatch(logout());
            }
        });
    };

    return (
        <button
            key="logout"
            className={`nav-item bg-red-100 text-black rounded flex flex-row justify-between items-center my-2 font-semibold`}
            onClick={handleLogout}
        >
            <span>Logout</span>
        </button>
    );
};

export default LogoutButton;
