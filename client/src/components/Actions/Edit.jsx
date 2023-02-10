import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateApi, viewDetailApi } from "../../api/users-api";
import { reload } from "../../stores/slices/userFilterSlice";
import { useLoading } from "../../utils/hooks/useLoading";

import Swal from "../../utils/swal-helpers";
import yup from "../../utils/yup-config";
import Button from "../Form/Button";
import Input from "../Form/Input";
import Icon from "../Icon";

const Edit = ({ data }) => {
    const dispatch = useDispatch();

    const handleEdit = () => {
        viewDetailApi(data.id).then((res) => {
            Swal.fire({
                title: "Edit",
                html: (
                    <EditForm
                        oldData={{
                            id: data.id,
                            name: res.name,
                            address: res.address,
                        }}
                    />
                ),
                showCancelButton: false,
                showConfirmButton: false,
            }).then(() => {
                dispatch(reload());
            });
        });
    };

    return (
        <Icon
            icon="edit"
            color="rgb(2 132 199)"
            className="cursor-pointer"
            onClick={handleEdit}
        />
    );
};

export default Edit;

function EditForm({ oldData }) {
    const { setLoading, setIdle } = useLoading();

    // Form init
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: {
            ...oldData,
        },
    });

    // HandleSubmit
    const handleSubmitForm = (data) => {
        setLoading();
        updateApi(oldData.id, data).then((res) => {
            setIdle();
            if (res.status == 200) {
                toast.success("User Edited");
                Swal.close();
            }
        });
    };

    return (
        <form
            className="w-full h-max"
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
}

const schema = yup.object().shape({
    name: yup.string().trim().required("Name is required!"),
});
