import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    startConnection,
    stopConnection,
} from "../../stores/slices/signalRConnectionSlice";
import { Role } from "../constants";

export const useHubConnection = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        if (auth && auth.role === Role.ADMIN) {
            dispatch(startConnection());
        }

        if (!auth) {
            dispatch(stopConnection());
        }
    }, [auth]);
};
