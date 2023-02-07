import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import yup from "../../utils/yup-config";
import Button from "../Form/Button";
import Input from "../Form/Input";

const PasswordCreateForm = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    // Form init
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const navigate = useNavigate();

    // HandleSubmit
    const handleSubmitForm = (data) => {
        console.log(data);
    };

    return (
        <form
            className="w-full h-max md:mt-8"
            onSubmit={handleSubmit(handleSubmitForm)}
        >
            <Input
                className="py-3 w-full"
                label="Password"
                placeholder="Please enter your Password"
                register={register("password")}
                type="password"
                error={errors.password}
            />
            <Input
                className="py-3 w-full"
                label="Confirm password"
                placeholder="Please confirm your Password"
                register={register("confirmPassword")}
                type="password"
                error={errors.confirmPassword}
            />
            <Button className="mt-2.5 block" type="submit">
                Create Password
            </Button>
        </form>
    );
};

export default PasswordCreateForm;

const schema = yup.object().shape({
    password: yup
        .string()
        .trim()
        .required("Password is required!")
        .min(8, "Password must be minimum of 8 characters length")
        .password(
            "Password can only contains alphabet, uppercase, number and these special characters: !@#$%^&*_-"
        ),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
});
