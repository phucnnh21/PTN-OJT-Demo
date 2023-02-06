import React from "react";
import Icon from "../Icon";
import Delete from "./Delete";
import Edit from "./Edit";
import ViewDetail from "./ViewDetail";

const Actions = ({ data }) => {
    return (
        <div>
            <Edit data={data} />
            <Delete data={data} />
            <ViewDetail data={data} />
        </div>
    );
};

export default Actions;
