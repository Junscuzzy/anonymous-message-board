import mongoose, { Schema, Document } from 'mongoose'

import { ReplySchema, IReply } from './reply.model'

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
export const Thread = mongoose.model<IThread>('Thread', ThreadSchema)

// Methods

export async function create(
  props: Pick<IThread, 'text' | 'password' | 'board'>,
) {
  const thread = new Thread(props)
  const result = await thread.save()
  return result
}

export async function getById(id: string) {
  const thread = await Thread.findById(id)
  return thread
}

export async function getRecentThreads(board: string) {
  const result = await Thread.find({ board }).sort({ bumpedAt: -1 }).limit(10)
  return result
}
