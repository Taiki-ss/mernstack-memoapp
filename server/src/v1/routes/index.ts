import Express from 'express';

const router = Express.Router();

router.use('/auth', require('./auth'));

module.exports = router;
