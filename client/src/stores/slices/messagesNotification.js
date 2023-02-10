import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const messagesNotificationSlice = createSlice({
    name: "messagesNotification",
    initialState,
    reducers: {
        setMessagesNotifications: (_, action) => action.payload,
    },
    extraReducers: (builder) => {},
});

export const { setMessagesNotifications } = messagesNotificationSlice.actions;

export default messagesNotificationSlice.reducer;
