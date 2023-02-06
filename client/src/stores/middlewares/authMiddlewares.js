import {
    removeUserTokenAndData,
    setUserTokenAndData,
    getUserTokenAndData,
} from "../../utils/localStorage-helpers";
import { login, logout, editProfile } from "../slices/authSlice";

const authMiddleware = (store) => (next) => (action) => {
    if (login.match(action)) {
        setUserTokenAndData(action.payload);
    } else if (logout.match(action)) {
        removeUserTokenAndData();
    } else if (editProfile.match(action)) {
        var { user, accessToken } = getUserTokenAndData();

        user.name = action.payload;

        setUserTokenAndData({
            token: accessToken,
            user,
        });
    }

    return next(action);
};

export default authMiddleware;
