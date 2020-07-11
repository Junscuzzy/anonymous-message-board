import mongoose, { Schema, Document } from 'mongoose'

import { ReplySchema, IReply } from '../reply/reply.model'

// Interface
export interface IThread extends Document {
  board: string
  text: string
  createdAt: any
  bumpedAt: any
  reported: boolean
  password: string
  replies: IReply[]
}

// Schema
export const ThreadSchema: Schema<IThread> = new Schema({
  board: { type: String, required: true },
  text: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  bumpedAt: { type: Date, default: new Date() },
  reported: { type: Boolean, default: false },
  replies: [ReplySchema],
})

// Model
const Thread = mongoose.model<IThread>('Thread', ThreadSchema)

export default Thread
