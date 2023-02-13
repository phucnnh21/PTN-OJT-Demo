import Tippy from "@tippyjs/react";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { deleteApi } from "../../api/users-api";
import { reload } from "../../stores/slices/userFilterSlice";
import Icon from "../Icon";

const Delete = ({ data }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        Swal.fire({
            title: `Do you want to DELETE the user named "${data.name}"`,
            showDenyButton: true,
            confirmButtonText: "Cancel",
            denyButtonText: `Delete`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
            } else if (result.isDenied) {
                deleteApi(data.id).then((res) => {
                    if (res.status == 200) {
                        toast.success(`User "${data.name}" deleted!`);
                        dispatch(reload());
                    }
                });
            }
        });
    };

    return (
        <Tippy content="Delete">
            <button onClick={handleDelete} className="mx-4">
                <Icon icon="trash" color="rgb(220 38 38)" />
            </button>
        </Tippy>
    );
};

export default Delete;
