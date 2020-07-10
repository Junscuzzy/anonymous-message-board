import mongoose, { Schema, Document } from 'mongoose'
import { Thread } from './thread.model'

// Interface
export interface IReply extends Document {
  text: string
  createdAt: any
  reported: boolean
  password: string
}

// Schema
export const ReplySchema: Schema<IReply> = new Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  reported: { type: Boolean, default: false },
  password: { type: String, required: true },
})

// Model
export const Reply = mongoose.model<IReply>('Reply', ReplySchema)

// Methods
export async function create(props: Pick<IReply, 'text' | 'password'>) {
  const reply = new Reply(props)
  const result = await reply.save()
  return result
}

export async function updateReply(
  text: string,
  replyId: string,
  threadId: string,
) {
  const query = { _id: threadId, 'replies._id': replyId }
  const update = { $set: { 'replies.$.text': text } }
  const options = { new: true }
  const thread = await Thread.findOneAndUpdate(query, update, options)
  return thread
}
