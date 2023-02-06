import { configureStore } from "@reduxjs/toolkit";

import authMiddleware from "./middlewares/authMiddlewares";

import authSlice from "./slices/authSlice";
import userFilterSlice from "./slices/userFilterSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        userFilter: userFilterSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authMiddleware),
});

export default store;
