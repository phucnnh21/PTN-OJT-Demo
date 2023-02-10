import { configureStore } from "@reduxjs/toolkit";

import authMiddleware from "./middlewares/authMiddlewares";

import authSlice from "./slices/authSlice";
import chatRoomSlice from "./slices/chatRoomSlice";
import signalRConnectionSlice from "./slices/signalRConnectionSlice";
import userFilterSlice from "./slices/userFilterSlice";
import messagesNotificationSlice from "./slices/messagesNotification";
import loadingSlice from "./slices/loadingSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        userFilter: userFilterSlice,
        signalRConnection: signalRConnectionSlice,
        chatRoom: chatRoomSlice,
        messagesNotifications: messagesNotificationSlice,
        loading: loadingSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }).concat(authMiddleware),
});

export default store;
