import React from "react";
import Icon from "../Icon";

import "./Table.css";

const Table = ({ headers, data, orderBy, handleOrderBy }) => {
    return (
        <table className="table-fixed border-collapse border border-slate-500 w-full my-8">
            <thead className="bg-gray-800 text-white">
                <tr>
                    {headers.map((header) => {
                        if (header.sortable) {
                            return (
                                <th
                                    key={header.value}
                                    className="cursor-pointer"
                                    onClick={() => handleOrderBy(header)}
                                >
                                    {header.title}{" "}
                                    {header.value === orderBy.fieldName &&
                                        (orderBy.isAscending ? (
                                            <Icon icon="caret-down" />
                                        ) : (
                                            <Icon icon="caret-up" />
                                        ))}
                                </th>
                            );
                        }

                        return (
                            <th key={header.value}>
                                {header.title}{" "}
                                {header.value === orderBy.fieldName &&
                                    (orderBy.isAscending ? <Icon /> : <Icon />)}
                            </th>
                        );
                    })}
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
                    <tr key={`row-${row.id}`}>
                        {Object.keys(row).map((key) => (
                            <td key={`cell-${key}-${row.id}`}>{row[key]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
