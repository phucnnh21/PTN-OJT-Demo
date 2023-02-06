import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

const instance = axios.create({
    baseURL: API_BASE_URL || "",
});

instance.defaults.withCredentials = true;

instance.interceptors.request.use(
    async function (config) {
        // Get token from firebase
        var token = localStorage.getItem("accessToken") || "";

        // Set token to authorize header
        config.headers.Authorization = token ? `Bearer ${token}` : "";

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default instance;
