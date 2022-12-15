import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.set('strictQuery', false);

export default () => {
  // DB接続
  try {
    mongoose.connect(process.env.MONGODB_URL!);
    console.log('DB接続中');
  } catch (error) {
    console.log(error);
  }
};
