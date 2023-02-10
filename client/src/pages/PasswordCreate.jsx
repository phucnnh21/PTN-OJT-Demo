import PageWrapper from "../components/PageWrapper";
import React, { useEffect, useState } from "react";
import PasswordCreateForm from "../components/AuthForms/PasswordCreateForm";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyTokenApi } from "../api/auth-api";

const PasswordCreate = () => {
    const [loading, setLoading] = useState(true);

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const navigate = useNavigate();

    useEffect(() => {
        verifyTokenApi({
            token,
        })
            .then(() => {
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                navigate("/");
            });
    }, []);

    if (loading) {
        return (
            <PageWrapper className="flex items-center justify-center"></PageWrapper>
        );
    }

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
