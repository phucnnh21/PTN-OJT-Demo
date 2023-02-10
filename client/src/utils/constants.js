export const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5171/api";

export const HUB_BASE_URL =
    import.meta.env.VITE_HUB_BASE_URL || "http://localhost:5171";

export const Role = {
    ADMIN: "admin",
    USER: "user",
};
