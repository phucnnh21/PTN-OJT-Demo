import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AuthRouteLayout from "./components/Routes/AuthRouteLayout";
import ProtectedRouteLayout from "./components/Routes/ProtectedRouteLayout";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/manage/Profile";
import PasswordUpdate from "./pages/manage/PasswordUpdate";
import ViewUsers from "./pages/manage/users/View";
import AdminRouteLayout from "./components/Routes/AdminRouteLayout";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<AuthRouteLayout />}>
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/" element={<Login />} />
                    </Route>

                    <Route path="/manage" element={<ProtectedRouteLayout />}>
                        <Route
                            path="password-update"
                            element={<PasswordUpdate />}
                        />

                        <Route path="" element={<Profile />} />

                        <Route element={<AdminRouteLayout />}>
                            <Route path="users" element={<ViewUsers />} />
                        </Route>
                    </Route>

                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </>
    );
}

export default App;
