import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "tippy.js/dist/tippy.css";
import "./index.css";

// Redux store
import { Provider } from "react-redux";
import store from "./stores";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <App />
    </Provider>
);
