import "./Button.css";

const Button = ({
    children,
    className = "",
    style = {},
    variant = "primary",
    border = false,
    ...props
}) => {
    return (
        <button
            className={`btn-app ${className} ${
                `${border}` === "true" ? "border-2 border-slate-900" : ""
            }`}
            style={{ ...buttonVariants[variant], ...style }}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;

export const buttonVariants = {
    primary: {
        backgroundColor: "var(--teal-general-color)",
        color: "var(--white-color)",
    },
    secondary: {
        backgroundColor: "var(--white-color)",
        color: "var(--teal-general-color)",
    },
    danger: {
        backgroundColor: "var(--red-general-color)",
        color: "var(--white-color)",
    },
    white: {
        backgroundColor: "var(--white-color)",
        color: "var(--black-color)",
    },
    "white-border": {
        backgroundColor: "var(--white-color)",
        color: "var(--black-color)",
    },
};
