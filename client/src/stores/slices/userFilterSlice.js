import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page: 1,
    size: 5,
    keyword: "",
    role: "",
    total: 0,
};

const userFilterSlice = createSlice({
    name: "userFilter",
    initialState,
    reducers: {
        setFilter: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        },

        clear: () => initialState,

        reload: (state) => ({
            ...state,
        }),
    },
    extraReducers: (builder) => {},
});

export const { setFilter, clear, reload } = userFilterSlice.actions;

export default userFilterSlice.reducer;
