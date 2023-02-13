export const queryBuilder = (queryObj) => {
    var tempArr = [];

    for (let key in queryObj) {
        if (queryObj[key]) {
            tempArr.push(`${key}=${queryObj[key]}`);
        }
    }

    return "?" + tempArr.join("&");
};

export function groupBy(list, keyGetter) {
    const map = {};
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map[key];
        if (!collection) {
            map[key] = [item];
        } else {
            collection.push(item);
        }
    });
    return map;
}
