import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { HUB_BASE_URL } from "../../utils/constants";
import { toast } from "react-toastify";
import { getAccessToken } from "../../utils/localStorage-helpers";

const initialState = null;

const signalRConnectionSlice = createSlice({
    name: "signalR",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(startConnection.fulfilled, (_, action) => {
                return action.payload;
            })
            .addCase(stopConnection.fulfilled, (_, action) => {
                return action.payload;
            });
    },
});

export const {} = signalRConnectionSlice.actions;
export default signalRConnectionSlice.reducer;

export const startConnection = createAsyncThunk(
    "signalR/connect",
    async (_) => {
        const connection = new HubConnectionBuilder()
            .withUrl(
                `${HUB_BASE_URL}/notification?access_token=${getAccessToken()}`
            )
            .withAutomaticReconnect()
            .build();

        await connection.start();

        connection.on("Notification", (notification) => {
            toast.info(notification);
        });

        return connection;
    }
);

export const stopConnection = createAsyncThunk(
    "signalR/stop",
    async (_, thunkApi) => {
        const state = thunkApi.getState();

        const signalRConnection = state.signalRConnection;

        if (signalRConnection && signalRConnection.stop) {
            await signalRConnection.stop();
        }

        return null;
    }
);
