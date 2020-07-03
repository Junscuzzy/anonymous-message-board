import { Schema, Document } from 'mongoose'

export interface IReply extends Document {
  text: string
  createdAt: any
  reported: boolean
  password: string
}

export const ReplySchema: Schema<IReply> = new Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  reported: { type: Boolean, default: false },
  password: { type: String, required: true },
})
