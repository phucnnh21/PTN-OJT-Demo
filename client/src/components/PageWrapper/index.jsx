import React from "react";
import "./PageWrapper.css";

const PageWrapper = ({ className = "", style = {}, children, ...props }) => {
    return (
        <div
            className={`page-wrapper w-full min-h-[100vh] ${className} bg-gray-100`}
            style={{ ...style }}
            {...props}
        >
            {children}
        </div>
    );
};

export default PageWrapper;
