export const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5171/api";

export const HUB_BASE_URL =
    import.meta.env.VITE_HUB_BASE_URL || "http://localhost:5171";

export const managePageList = [
    { name: "Profile", path: "/manage/profile" },
    { name: "Update Password", path: "/manage/password-update" },
];

export const adminManagePageList = [
    ...managePageList,
    { name: "Manage Users", path: "/manage/users" },
];

export const Role = {
    ADMIN: "admin",
    USER: "user",
};
