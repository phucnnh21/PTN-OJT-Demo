import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clear, setFilter } from "../../stores/slices/userFilterSlice";
import { Role } from "../../utils/constants";
import Icon from "../Icon";

const SearchBar = () => {
    // Filter
    const userFilter = useSelector((state) => state.userFilter);
    const dispatch = useDispatch();

    const inputRef = useRef(null);

    const { role } = userFilter;

    const handleClear = () => {
        dispatch(clear());

        if (inputRef?.current) {
            inputRef.current.value = "";
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (inputRef?.current?.value != null) {
            dispatch(
                setFilter({
                    page: 1,
                    keyword: inputRef.current.value,
                })
            );
        }
    };

    return (
        <form className="flex items-center w-full" onSubmit={handleSubmit}>
            <div className="relative w-full">
                <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Search..."
                    ref={inputRef}
                />
                <button
                    type="submit"
                    className="flex absolute inset-y-0 right-0 items-center pr-3"
                >
                    <Icon icon="search" />
                </button>
            </div>

            <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ml-2 p-2.5 cursor-pointer"
                value={role}
                onChange={(e) => {
                    dispatch(setFilter({ role: e.target.value }));
                }}
            >
                <option value="">Role</option>
                {Object.keys(Role).map((role) => (
                    <option value={Role[role]} key={role}>
                        {role}
                    </option>
                ))}
            </select>

            <button
                type="button"
                className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleClear}
            >
                <Icon icon="arrows-rotate" className="mr-2" />
                Clear
            </button>
        </form>
    );
};

export default SearchBar;
