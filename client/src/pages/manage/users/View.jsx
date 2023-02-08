import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterApi } from "../../../api/users-api";
import SearchBar from "../../../components/Form/SearchBar";
import Actions from "../../../components/Actions";
import Pagination from "../../../components/Pagination";
import Table from "../../../components/Table";
import { setFilter } from "../../../stores/slices/userFilterSlice";
import { Role } from "../../../utils/constants";

const View = () => {
    // Data to fill in the table
    const [tableData, setTableData] = useState([]);

    // Filter
    const userFilter = useSelector((state) => state.userFilter);
    const dispatch = useDispatch();

    const { total, page, size, orderBy } = userFilter;

    const setCurrentPage = (page) => {
        dispatch(setFilter({ page }));
    };

    useEffect(() => {
        filterApi(userFilter).then((res) => {
            setTableData(res.payload);
            if (total != res.total) {
                dispatch(setFilter({ total: res.total }));
            }
        });
    }, [userFilter]);

    const handleOrderBy = (header) => {
        if (orderBy.fieldName != header.value) {
            dispatch(
                setFilter({
                    orderBy: {
                        fieldName: header.value,
                        isAscending: true,
                    },
                })
            );
        } else {
            dispatch(
                setFilter({
                    orderBy: {
                        fieldName: header.value,
                        isAscending: !orderBy.isAscending,
                    },
                })
            );
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center p-16">
            <SearchBar />

            <div>
                <Table
                    headers={userTableHeaders}
                    data={tableData.map((u) => ({
                        id: u.id,
                        name: u.name,
                        role: u.role,
                        lastUpdatedAt: moment(u.lastUpdatedAt).fromNow(),
                        actions:
                            u.role !== Role.ADMIN ? (
                                <Actions data={u} />
                            ) : (
                                <></>
                            ),
                    }))}
                    orderBy={orderBy}
                    handleOrderBy={handleOrderBy}
                />

                <Pagination
                    pageLimit={size}
                    currentPage={page}
                    setCurrentPage={setCurrentPage}
                    totalItems={total}
                    className="mb-0"
                />
            </div>

            <div></div>
        </div>
    );
};

export default View;

const userTableHeaders = [
    {
        title: "Id",
        value: "Id",
        sortable: true,
    },
    {
        title: "Name",
        value: "Name",
        sortable: true,
    },
    {
        title: "Role",
        value: "Role",
        sortable: true,
    },
    {
        title: "Last Modified",
        value: "LastUpdatedAt",
        sortable: true,
    },
    {
        title: "Actions",
        value: "Actions",
    },
];
