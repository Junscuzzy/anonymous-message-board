import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ReplySchema = new Schema({
  text: { type: String },
  createdAt: { type: Date, default: new Date() },
  reported: { type: Boolean, default: false },
  password: { type: String, required: true },
})

const ThreadSchema = new Schema({
  board: { type: String, required: true },
  text: { type: String },
  password: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  bumpedAt: { type: Date, default: new Date() },
  reported: { type: Boolean, default: false },
  replies: [ReplySchema],
})

export default mongoose.model('Thread', ThreadSchema)
