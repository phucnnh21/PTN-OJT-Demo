export const queryBuilder = (queryObj) => {
    var tempArr = [];

    for (let key in queryObj) {
        if (queryObj[key]) {
            tempArr.push(`${key}=${queryObj[key]}`);
        }
    }

    return "?" + tempArr.join("&");
};
