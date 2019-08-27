const router = require('express').Router();
const batchController = require('../controllers/batch.ctrl');
const rateLimiter = require('../middlewares/ratelimiter');
const batchValidator = require('../middlewares/batch-validation');

router.post('/batch', rateLimiter(), batchValidator, batchController.batch);
// Only POST allowed
router.use('/batch', (req, res) => { res.status(405).end(); });

module.exports = router;
