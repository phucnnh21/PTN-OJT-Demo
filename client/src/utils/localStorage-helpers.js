export const getUserTokenAndData = () => {
    var userStringified = localStorage.getItem("user");
    var user = JSON.parse(userStringified);
    var accessToken = localStorage.getItem("accessToken");

    return { user, accessToken };
};

export const removeUserTokenAndData = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
};

export const setUserTokenAndData = (payload) => {
    localStorage.setItem("accessToken", payload.token);
    localStorage.setItem("user", JSON.stringify(payload.user));
};
