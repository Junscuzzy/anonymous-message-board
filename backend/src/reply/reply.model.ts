import mongoose, { Schema, Document } from 'mongoose'

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

export default Reply
