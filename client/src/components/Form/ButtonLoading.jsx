import "./Button.css";

const ButtonLoading = ({
    children,
    className = "",
    style = {},
    variant = "primary",
    border = false,
    loading,
    ...props
}) => {
    const isLoading = loading === "loading";

    return (
        <button
            className={`btn-app ${buttonVariants[variant]} ${className} ${
                `${border}` === "true" ? "border-2 border-slate-900" : ""
            }`}
            style={{
                ...style,
                opacity: isLoading ? "0.5" : "1",
            }}
            disabled={isLoading}
            {...props}
        >
            {children}
        </button>
    );
};

export default ButtonLoading;

export const buttonVariants = {
    primary: "bg-teal-500 text-white hover:bg-teal-600",
    secondary: "bg-white text-teal-500 hover:bg-teal-50",
    danger: "bg-rose-500 text-white hover:bg-rose-600",
    white: "bg-white text-black hover:bg-teal-50",
    "white-border": "bg-white text-black hover:bg-teal-50",
};
