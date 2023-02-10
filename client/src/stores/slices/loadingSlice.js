import { createSlice } from "@reduxjs/toolkit";

const initialState = "idle";

const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        setLoadingStatus: (_, action) => action.payload,
    },
    extraReducers: (_) => {},
});

export const { setLoadingStatus } = loadingSlice.actions;

export default loadingSlice.reducer;
