import React, { useRef } from "react";
import Icon from "../Icon";

const ChatSearchUser = ({ userFilter, setUserFilter }) => {
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        setUserFilter({
            ...userFilter,
            keyword: inputRef?.current?.value,
        });
    };

    return (
        <div className="absolute top-0 p-4 pt-16 md:pt-4 w-full">
            <form className="relative w-full" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    placeholder="Search..."
                    ref={inputRef}
                />
                <button
                    type="submit"
                    className="flex absolute inset-y-0 right-0 items-center pr-3"
                >
                    <Icon icon="search" />
                </button>
            </form>
        </div>
    );
};

export default ChatSearchUser;
