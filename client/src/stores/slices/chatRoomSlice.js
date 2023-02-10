import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleAccessChatRoom } from "../../api/firestore-api";

const initialState = null;

const chatRoomSlice = createSlice({
    name: "chatRoom",
    initialState,
    reducers: {
        setChatRoom: (_, action) => action.payload,
    },
    extraReducers: (builder) => {
        builder.addCase(setChatRoomAsync.fulfilled, (_, action) => {
            return action.payload;
        });
    },
});

export const { setChatRoom } = chatRoomSlice.actions;

export default chatRoomSlice.reducer;

export const setChatRoomAsync = createAsyncThunk(
    "chatRoom/setChatRoomAsync",
    async ({ user1, user2, userEmail }) => {
        const roomId = await handleAccessChatRoom(user1, user2);

        return {
            roomId,
            userEmail,
        };
    }
);
