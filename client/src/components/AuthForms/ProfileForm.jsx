import * as React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import yup from "../../utils/yup-config.js";

import Input from "../Form/Input";
import Button from "../Form/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateApi, viewDetailApi } from "../../api/users-api.js";
import { toast } from "react-toastify";
import { editProfile } from "../../stores/slices/authSlice.js";

const ProfileForm = () => {
    // Form init
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    // HandleSubmit
    const handleSubmitForm = (data) => {
        updateApi(auth.id, data).then((res) => {
            if (res.status == 200) {
                toast.success("Profile updated");
                dispatch(editProfile(data.name));
            }
        });
    };

    React.useEffect(() => {
        viewDetailApi(auth.id).then((res) => {
            setValue("name", res.name);
            setValue("address", res.address);
        });
    }, []);

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
                label="Address"
                placeholder="Please enter your Address"
                register={register("address")}
            />
            <Button className="mt-2.5 block" type="submit">
                Edit
            </Button>
        </form>
    );
};

const schema = yup.object().shape({
    name: yup.string().trim().required("Name is required!"),
});

export default ProfileForm;
