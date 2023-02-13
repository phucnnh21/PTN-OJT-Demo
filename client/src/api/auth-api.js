import { signInWithCustomToken } from "@firebase/auth";
import { auth } from "../utils/firebase/firebase-config";
import axios from "./axios-instance";

const apiRoute = "/auth";

export const signUpApi = async (data) => {
    const res = await axios.post(apiRoute + "/signup", data);

    return res.data;
};

export const loginApi = async (data) => {
    const res = await axios.post(apiRoute + "/login", data);

    const token = res.data.customToken;

    const firebaseRes = await signInWithCustomToken(auth, token);

    console.log(firebaseRes);

    return res.data;
};

export const changePasswordApi = async (data) => {
    const res = await axios.put(apiRoute + "/password-update", data);

    return res;
};

export const verifyTokenApi = async (data) => {
    const res = await axios.post(apiRoute + "/verify-token", data);
    return res;
};

export const createPasswordApi = async (data) => {
    const res = await axios.post(apiRoute + "/password-create", data);

    return res;
};
