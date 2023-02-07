import PageWrapper from "../components/PageWrapper";
import React from "react";
import PasswordCreateForm from "../components/AuthForms/PasswordCreateForm";

const PasswordCreate = () => {
    return (
        <PageWrapper className="flex items-center justify-center">
            <div className="w-[500px] bg-white rounded p-8 border flex flex-col items-center">
                <h3 className="font-bold text-2xl">Create Password</h3>
                <PasswordCreateForm />
            </div>
        </PageWrapper>
    );
};

export default PasswordCreate;
