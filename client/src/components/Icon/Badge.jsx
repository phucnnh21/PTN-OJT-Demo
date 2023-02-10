import React from "react";

const Badge = ({ content, className = "" }) => {
    return (
        <span
            className={`bg-red-600 text-white text-xs font-medium mr-2 px-2 py-0.5 rounded text-center align-middle ${className}`}
        >
            {content}
        </span>
    );
};

export default Badge;
