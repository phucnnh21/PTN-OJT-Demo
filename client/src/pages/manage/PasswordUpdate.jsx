import React from "react";
import PasswordUpdateForm from "../../components/AuthForms/PasswordUpdateForm";

const PasswordUpdate = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-[500px] bg-white rounded p-8 border flex flex-col items-center">
                <h3 className="font-bold text-2xl">Password Update</h3>
                <PasswordUpdateForm />
            </div>
        </div>
    );
};

export default PasswordUpdate;
