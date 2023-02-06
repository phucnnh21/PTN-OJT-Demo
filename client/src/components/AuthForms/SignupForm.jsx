import * as React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import yup from "../../utils/yup-config.js";
import Input from "../Form/Input";
import Button from "../Form/Button";
import { signUpApi } from "../../api/auth-api.js";

const SignupForm = () => {
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
        signUpApi(data)
            .then(() => {
                toast.success("You are all signed up! Now you can login!");
                navigate("/");
            })
            .catch((err) => {
                toast.error(err.response.data);
            });
    };

    return (
        <form
            className="w-full h-max md:mt-8"
            onSubmit={handleSubmit(handleSubmitForm)}
        >
            <Input
                className="py-3 w-full"
                label="Name"
                placeholder="Please enter your Name"
                register={register("name")}
                error={errors.name}
            />
            <Input
                className="py-3 w-full"
                label="Email"
                placeholder="Please enter your Email"
                register={register("email")}
                error={errors.email}
            />
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
            <Link className="mt-2 inline-block text-sm text-gray-500" to="/">
                You already have an account?{" "}
                <span className="text-blue-500">Login now</span>
            </Link>
            <Button className="mt-2.5 block" type="submit">
                Signup
            </Button>
        </form>
    );
};

const schema = yup.object().shape({
    name: yup.string().trim().required("Name is required!"),
    email: yup
        .string()
        .trim()
        .required("Email is required!")
        .email("Please input a correct email format!"),
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

export default SignupForm;
