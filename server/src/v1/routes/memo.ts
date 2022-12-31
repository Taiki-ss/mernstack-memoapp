import Express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { create } from '../controllers/memo';
import tokenHandler from '../middleware/tokenHandler';

const router = Express.Router();

router.post('/', tokenHandler.verifyToken, create);

module.exports = router;
