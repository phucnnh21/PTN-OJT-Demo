import { useDispatch } from "react-redux";
import { setLoadingStatus } from "../../stores/slices/loadingSlice";

export const useLoading = () => {
    const dispatch = useDispatch();

    const setLoading = () => dispatch(setLoadingStatus("loading"));
    const setIdle = () => dispatch(setLoadingStatus("idle"));

    return { setLoading, setIdle };
};
