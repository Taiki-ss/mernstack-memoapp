import mongoose, { Schema } from 'mongoose';

const memoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  icon: {
    type: String,
    default: '📝',
  },
  title: {
    type: String,
    default: '無題',
  },
  description: {
    type: String,
    default: 'ここに自由に記入してください。',
  },
  position: {
    type: Number,
  },
  favorit: {
    type: Boolean,
    default: false,
  },
  favoritPosition: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model('Memo', memoSchema);
