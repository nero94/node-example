const config = {
    port: process.env.PORT || 8080,
    rateLimit: {
        requestNum: 5,
        delayTime: 10,
    },
};

module.exports = config;
