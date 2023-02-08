import { configureStore } from "@reduxjs/toolkit";

import authMiddleware from "./middlewares/authMiddlewares";

import authSlice from "./slices/authSlice";
import signalRConnectionSlice from "./slices/signalRConnectionSlice";
import userFilterSlice from "./slices/userFilterSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        userFilter: userFilterSlice,
        signalRConnection: signalRConnectionSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }).concat(authMiddleware),
});

export default store;
