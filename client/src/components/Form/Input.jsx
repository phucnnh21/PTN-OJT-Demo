import "./Input.css";

const Input = ({
    children,
    className = "",
    style = {},
    isRequired = false,
    label,
    register,
    error,
    ...props
}) => {
    return (
        <div className={`${className}`} style={style}>
            {label && (
                <label
                    htmlFor={register.name}
                    className="block mb-1 font-bold text-left"
                >
                    {label}{" "}
                    {isRequired ? (
                        <span className="text-red-600">*</span>
                    ) : null}
                </label>
            )}
            <input
                className="input-app w-full"
                id={register.name}
                {...register}
                {...props}
            />
            {error?.message && (
                <span
                    className="text-[color:var(--red-general-color)]"
                    data-cy="error-message"
                >{`${error.message}`}</span>
            )}
        </div>
    );
};

export default Input;
