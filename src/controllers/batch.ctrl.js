const batchSvc = require('../services/batch.svc');

exports.batch = async (req, res, next) => {
    const method = req.body.request.verb;
    const { url } = req.body.request;
    const { payloads } = req.body;

    try {
        const data = await batchSvc.batch(url, method, payloads);
        const success = data.reduce((acc, cur) => {
            if (cur) {
                return acc + 1;
            }
            return acc;
        }, 0);
        res.json({ status: `${success}/${data.length - success}` });
    } catch (err) {
        next(err);
    }
};
