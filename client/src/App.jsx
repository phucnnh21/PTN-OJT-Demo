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
import PasswordCreate from "./pages/PasswordCreate";
import { useHubConnection } from "./utils/hooks/useHubConnection";
import ChatRoom from "./pages/manage/ChatRoom";
import { auth } from "./utils/firebase/firebase-config";

function App() {
    useHubConnection();

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<AuthRouteLayout />}>
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/" element={<Login />} />
                        <Route
                            path="/password-create"
                            element={<PasswordCreate />}
                        />
                    </Route>

                    <Route path="/manage" element={<ProtectedRouteLayout />}>
                        <Route
                            path="password-update"
                            element={<PasswordUpdate />}
                        />

                        <Route path="profile" element={<Profile />} />

                        <Route path="chat" element={<ChatRoom />} />

                        <Route element={<AdminRouteLayout />}>
                            <Route path="users" element={<ViewUsers />} />
                        </Route>

                        <Route
                            path=""
                            element={<Navigate to="/manage/profile" />}
                        />
                    </Route>

                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </>
    );
}

export default App;
