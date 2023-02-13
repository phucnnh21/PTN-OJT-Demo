import React from "react";
import Icon from "../Icon";
import Swal from "../../utils/swal-helpers";
import { viewDetailApi } from "../../api/users-api";
import moment from "moment";
import Tippy from "@tippyjs/react";

const ViewDetail = ({ data }) => {
    const handleViewDetail = () => {
        viewDetailApi(data.id).then((res) => {
            Swal.fire({
                title: res.name,
                html: (
                    <div className="flex flex-col w-full items-center justify-center px-8">
                        <div className="flex flex-row justify-between w-full">
                            <div className="font-bold">Name</div>
                            <div>{res.name}</div>
                        </div>
                        <div className="flex flex-row justify-between w-full">
                            <div className="font-bold">Email</div>
                            <div>{res.email}</div>
                        </div>
                        <div className="flex flex-row justify-between w-full">
                            <div className="font-bold">Address</div>
                            <div>{res.address || ""}</div>
                        </div>
                        <div className="flex flex-row justify-between w-full">
                            <div className="font-bold">Role</div>
                            <div>{res.role}</div>
                        </div>
                        <div className="flex flex-row justify-between w-full">
                            <div className="font-bold">Created at</div>
                            <div>
                                {moment(res.createdAt).format("MMM Do YYYY")}
                            </div>
                        </div>
                        <div className="flex flex-row justify-between w-full">
                            <div className="font-bold">Last modified</div>
                            <div>{moment(res.lastUpdatedAt).fromNow()}</div>
                        </div>
                    </div>
                ),
            });
        });
    };

    return (
        <Tippy content="View Detail">
            <button onClick={handleViewDetail}>
                <Icon icon="eye" color="rgb(5 150 105)" />
            </button>
        </Tippy>
    );
};

export default ViewDetail;
