import { createSlice } from "@reduxjs/toolkit";
import jwt from "jwt-decode";
import {
    getUserTokenAndData,
    removeUserTokenAndData,
} from "../../utils/localStorage-helpers";

const initialState = getInitialAuthState();

function getInitialAuthState() {
    var { user, accessToken } = getUserTokenAndData();

    if (!user) return null;

    const userDataFromToken = jwt(accessToken);

    if (!isTokenValid(userDataFromToken, user)) {
        removeUserTokenAndData();
    }

    return user;
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (_, action) => {
            return action.payload.user;
        },

        logout: () => {
            return null;
        },

        editProfile: (state, action) => {
            state.name = action.payload;
        },
    },
    extraReducers: (builder) => {},
});

export const { login, logout, editProfile } = authSlice.actions;

export default authSlice.reducer;

function isTokenValid(tokenData, user) {
    if (tokenData.nameid != user.id) return false;
    if (tokenData.email != user.email) return false;
    if (tokenData.role != user.role) return false;

    // Token expire
    var current_time = Date.now() / 1000;
    if (current_time > tokenData.exp) {
        console.log("token expired!");
        return false;
    }

    return true;
}
