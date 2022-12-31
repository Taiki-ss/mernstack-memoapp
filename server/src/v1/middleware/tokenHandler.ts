import { Request, Response, NextFunction } from 'express';
import JWT, { JwtPayload } from 'jsonwebtoken';
import User from '../models/user';
import dotenv from 'dotenv';

dotenv.config();

const tokenDecode = (req: Request) => {
  const bearerHeader = req.headers['authorization'];
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ')[1];
    try {
      const decodedToken = JWT.verify(bearer, process.env.TOKEN_SECRET_KEY!);
      return decodedToken;
    } catch {
      return false;
    }
  } else {
    return false;
  }
};

const verifyToken = async (req: any, res: Response, next: NextFunction) => {
  const tokenDecoded = tokenDecode(req) as JwtPayload;
  if (tokenDecoded) {
    // そのJWTと一致するユーザーを探してくる
    const user = await User.findById(tokenDecoded.id);
    if (!user) {
      return res.status(401).json('権限がありません');
    }
    req.user = user;
    next();
  } else {
    return res.status(401).json('権限がありません');
  }
};

export default { verifyToken };
