import { ObjectId } from 'mongoose';

// req.user が使えるようにする。
declare namespace Express {
  export interface Request {
    user: {
      _id: string | ObjectId | undefined;
      username: string;
      password: string;
    };
  }
  export interface Response {
    user: {
      _id: string | ObjectId | undefined;
      username: string;
      password: string;
    };
  }
}
