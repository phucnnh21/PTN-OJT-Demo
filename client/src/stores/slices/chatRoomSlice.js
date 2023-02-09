import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const chatRoomSlice = createSlice({
    name: "chatRoom",
    initialState,
    reducers: {
        setChatRoom: (_, action) => action.payload,
    },
    extraReducers: (builder) => {},
});

export const { setChatRoom } = chatRoomSlice.actions;

export default chatRoomSlice.reducer;
