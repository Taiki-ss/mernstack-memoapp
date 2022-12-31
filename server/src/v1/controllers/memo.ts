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
    return res.status(201).json(memo);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getAll = async (req: any, res: Response) => {
  try {
    const memos = await Memo.find({ user: req.user._id }).sort('-position');
    return res.status(201).json(memos);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getOne = async (req: any, res: Response) => {
  const { memoId } = req.params;
  try {
    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
    if (memo) {
      return res.status(201).json(memo);
    } else {
      return res.status(404).json('メモが存在しません');
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export { create, getAll, getOne };
