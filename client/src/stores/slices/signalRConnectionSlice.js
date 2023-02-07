import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { HUB_BASE_URL } from "../../utils/constants";
import { toast } from "react-toastify";

const initialState = null;

const signalRConnectionSlice = createSlice({
    name: "signalR",
    initialState,
    reducers: {},
});

export const {} = signalRConnectionSlice.actions;
export default signalRConnectionSlice.reducer;

export const startConnection = createAsyncThunk(
    "signalR/connect",
    async (_, thunkApi) => {
        const connection = new HubConnectionBuilder()
            .withUrl(HUB_BASE_URL + "/notification")
            .withAutomaticReconnect()
            .build();

        await connection.start();

        connection.on("Notification", (notification) => {
            toast.info(notification);
        });

        return connection;
    }
);
