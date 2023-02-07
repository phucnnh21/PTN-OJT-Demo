import React from "react";

import "./Table.css";

const Table = ({ headers, data }) => {
    return (
        <table className="table-fixed border-collapse border border-slate-500 w-full my-8">
            <thead className="bg-gray-800 text-white">
                <tr>
                    {headers.map((header) => (
                        <th key={header}>{header}</th>
                    ))}
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
