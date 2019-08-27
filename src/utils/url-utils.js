/**
 * Interpolates url if key is found in object and delete key then
 * {string} url - url
 * {object} obj - object to look for keys
 */
exports.interpolateUrl = (url, obj) => {
    let res = url;
    Object.keys(obj).forEach((key) => {
        const interpolate = `{${key}}`;
        if (res.indexOf(interpolate) > -1) {
            res = res.replace(interpolate, obj[key]);
            // eslint-disable-next-line no-param-reassign
            delete obj[key];
        }
    });
    return res;
};
