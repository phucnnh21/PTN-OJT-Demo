import axios from "./axios-instance";

import { queryBuilder } from "../utils/helpers";

const apiRoute = "/users";

export const viewDetailApi = async (userId) => {
    const res = await axios.get(apiRoute + "/" + userId);

    return res.data;
};

export const updateApi = async (userId, data) => {
    const res = await axios.put(apiRoute + "/" + userId, data);

    return res;
};

export const filterApi = async (filter) => {
    var path = apiRoute + "/filter";

    const res = await axios.post(path, {
        ...filter,
        searchColumns: ["name", "email"],
    });

    return res.data;
};

export const deleteApi = async (userId) => {
    const res = await axios.delete(apiRoute + "/" + userId);

    return res;
};
