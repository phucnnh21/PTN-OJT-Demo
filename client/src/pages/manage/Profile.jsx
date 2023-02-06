import React from "react";
import ProfileForm from "../../components/AuthForms/ProfileForm";

const Profile = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-[500px] bg-white rounded p-8 border flex flex-col items-center">
                <h3 className="font-bold text-2xl">Profile</h3>
                <ProfileForm />
            </div>
        </div>
    );
};

export default Profile;
