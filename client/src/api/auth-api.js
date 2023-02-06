import axios from "./axios-instance";

const apiRoute = "/auth";

export const signUpApi = async (data) => {
    const res = await axios.post(apiRoute + "/signup", data);

    return res.data;
};

export const loginApi = async (data) => {
    const res = await axios.post(apiRoute + "/login", data);

    return res.data;
};

export const changePasswordApi = async (data) => {
    const res = await axios.put(apiRoute + "/password-update", data);

    return res;
};
