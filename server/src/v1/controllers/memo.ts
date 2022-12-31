import { Request, Response } from 'express';
import { ObjectId } from 'mongoose';
import Memo from '../models/memo';

const create = async (req: any, res: Response) => {
  try {
    const memoCount = await Memo.find().count();
    const memo = await Memo.create({
      user: req.user._id,
      position: memoCount,
    });
    res.status(201).json(memo);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAll = async (req: any, res: Response) => {
  try {
    const memos = await Memo.find({ user: req.user._id }).sort('-position');
    res.status(201).json(memos);
  } catch (error) {
    res.status(500).json(error);
  }
};

export { create, getAll };
