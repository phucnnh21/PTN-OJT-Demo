import PageWrapper from "../components/PageWrapper";
import React from "react";
import SignupForm from "../components/AuthForms/SignupForm";

const Signup = () => {
    return (
        <PageWrapper className="flex items-center justify-center">
            <div className="w-[500px] bg-white rounded p-8 border flex flex-col items-center">
                <h3 className="font-bold text-2xl">Sign up</h3>
                <SignupForm />
            </div>
        </PageWrapper>
    );
};

export default Signup;
