import PageWrapper from "../components/PageWrapper";
import React from "react";
import LoginForm from "../components/AuthForms/LoginForm";

const Login = () => {
    return (
        <PageWrapper className="flex items-center justify-center">
            <div className="w-[500px] bg-white rounded p-8 border flex flex-col items-center">
                <h3 className="font-bold text-2xl">Login</h3>
                <LoginForm />
            </div>
        </PageWrapper>
    );
};

export default Login;
