module.exports = (req, res, next) => {
    if (!req.body) return res.status(400).send('Empty Body!');
    if (!req.body.request.url || !req.body.request.verb) return res.status(400).send('Url or method missing');
    if (!req.body.payloads || !req.body.payloads.length) return res.status(400).send('Payloads missing or empty!');
    return next();
};
