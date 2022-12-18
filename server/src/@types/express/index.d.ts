// req.user が使えるようにする。
declare namespace Express {
  export interface Request {
    user: {
    //   _id: string;
      username: string;
      password: string;
    };
  }
}
