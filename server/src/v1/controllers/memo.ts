import { Request, Response } from 'express';
import { ObjectId } from 'mongoose';
import Memo from '../models/memo';

const MemoController = {
  create: async (req: any, res: Response) => {
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
  },

  getAll: async (req: any, res: Response) => {
    try {
      const memos = await Memo.find({ user: req.user._id }).sort('-position');
      return res.status(201).json(memos);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getOne: async (req: any, res: Response) => {
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
  },

  update: async (req: any, res: Response) => {
    const { memoId } = req.params;
    const { title, description } = req.body;
    if (title === '') req.body.title = '無題';
    if (description === '')
      req.body.description = 'ここに自由に記入してください。';
    try {
      const memo = await Memo.findOneAndUpdate(
        { user: req.user._id, _id: memoId },
        { $set: req.body }
      );
      if (memo) {
        return res.status(201).json(memo);
      } else {
        return res.status(404).json('メモが存在しません');
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  delete: async (req: any, res: Response) => {
    const { memoId } = req.params;

    try {
      const memo = await Memo.findOneAndDelete({
        user: req.user._id,
        _id: memoId,
      });
      if (memo) {
        return res.status(201).json('メモを削除しました');
      } else {
        return res.status(404).json('メモが存在しません');
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

export default MemoController;
