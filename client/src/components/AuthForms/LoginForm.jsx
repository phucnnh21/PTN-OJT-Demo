import * as React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import yup from "../../utils/yup-config.js";

import Input from "../Form/Input";
import Button from "../Form/Button";
import { Link } from "react-router-dom";
import { loginApi } from "../../api/auth-api.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../stores/slices/authSlice.js";

const LoginForm = () => {
    // Form init
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const dispatch = useDispatch();
    // HandleSubmit
    const handleSubmitForm = (data) => {
        loginApi(data)
            .then((res) => {
                toast.success("Login success!");
                dispatch(login(res));
            })
            .catch((err) => {
                console.log(err);
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
            <Link
                className="mt-2 inline-block text-sm text-gray-500"
                to="/signup"
            >
                You don't have account?{" "}
                <span className="text-blue-500">Sign up now</span>
            </Link>
            <Button className="mt-2.5 block" type="submit">
                Login
            </Button>
        </form>
    );
};

const schema = yup.object().shape({
    email: yup
        .string()
        .required("Email is required!")
        .email("Please input a correct email format!"),
    password: yup
        .string()
        .required("Password is required!")
        .min(8, "Password must be minimum of 8 characters length"),
});

export default LoginForm;
