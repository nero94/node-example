const config = require('../config');

/**
 * Create Rate Limit function depending on number of requests to handle and delay time
 */
module.exports = (reqNum = config.rateLimit.requestNum, time = config.rateLimit.delayTime) => {
    let counter = 0;
    return (req, res, next) => {
        if (counter < reqNum) {
            counter += 1;
            return next();
        }
        setTimeout(() => {
            counter = 0;
        }, time * 1000);
        return res.status(429).send();
    };
};
