import * as React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import yup from "../../utils/yup-config.js";
import Input from "../Form/Input";
import Button from "../Form/Button";
import { changePasswordApi, signUpApi } from "../../api/auth-api.js";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../stores/slices/authSlice.js";

const PasswordUpdateForm = () => {
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
    const auth = useSelector((state) => state.auth);

    // HandleSubmit
    const handleSubmitForm = (data) => {
        changePasswordApi({ ...data, id: auth.id })
            .then((res) => {
                if (res.status == 200) {
                    toast.success("Password updated. Please login again!");
                    dispatch(logout());
                }
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
                label="Old Password"
                placeholder="Please enter your Old Password"
                register={register("oldPassword")}
                type="password"
                error={errors.oldPassword}
            />
            <Input
                className="py-3 w-full"
                label="New Password"
                placeholder="Please enter your New Password"
                register={register("newPassword")}
                type="password"
                error={errors.newPassword}
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
                Change Password
            </Button>
        </form>
    );
};

const schema = yup.object().shape({
    oldPassword: yup
        .string()
        .trim()
        .required("Old password is required!")
        .min(8, "Password must be minimum of 8 characters length")
        .password(
            "Password can only contains alphabet, uppercase, number and these special characters: !@#$%^&*_-"
        ),
    newPassword: yup
        .string()
        .trim()
        .required("New password is required!")
        .min(8, "Password must be minimum of 8 characters length")
        .password(
            "Password can only contains alphabet, uppercase, number and these special characters: !@#$%^&*_-"
        ),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

export default PasswordUpdateForm;
