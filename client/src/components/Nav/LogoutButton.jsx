import { signOut } from "@firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { logout } from "../../stores/slices/authSlice";
import { stopConnection } from "../../stores/slices/signalRConnectionSlice";
import { auth } from "../../utils/firebase/firebase-config";

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
                signOut(auth);
            }
        });
    };

    return (
        <button
            key="logout"
            className={`nav-item bg-red-100 hover:bg-red-300 text-black rounded flex flex-row justify-between items-center my-2 font-semibold`}
            onClick={handleLogout}
        >
            <span>Logout</span>
        </button>
    );
};

export default LogoutButton;
