import { Response, Request, NextFunction } from 'express';
import { validationResult } from 'express-validator';

const validatetion = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export default validatetion;
