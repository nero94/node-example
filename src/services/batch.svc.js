const request = require('request');
const urlUtils = require('../utils/url-utils');


module.exports.batch = async (url, method, payloads) => {
    const results = [];
    payloads.forEach((payload) => {
        const reqUrl = urlUtils.interpolateUrl(url, payload);
        results.push(new Promise((resolve, reject) => {
            request(reqUrl, {
                json: true,
                body: payload,
                method: 'PUT',
            }, (err, response, body) => {
                if (err) reject(err);
                resolve(body);
            });
        }));
    });

    return Promise.all(results);
};
