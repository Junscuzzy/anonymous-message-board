import Mongoose from 'mongoose'
import { ControllerFn } from '../types'
import * as Thread from '../models/thread.model'
import * as Reply from '../models/reply.model'

function objectIdToString(id: string): string {
  return Mongoose.Types.ObjectId(id).toHexString()
}

function isValidParam(param: any): boolean {
  if (!param || typeof param !== 'string' || param.trim() === '') {
    return false
  }
  return true
}

export const postReply: ControllerFn = async (req, res) => {
  //   const { board } = req.params
  const { text, password, threadId } = req.body

  try {
    if (!isValidParam(threadId)) {
      return res.json({ message: 'Thread id is missing' })
    }
    // Create a Reply
    const reply = await Reply.create({ text, password })

    // Push reply in Threads
    // & update bumped date
    const thread = await Thread.Thread.findByIdAndUpdate(
      threadId,
      {
        bumpedAt: new Date(),
        $push: {
          replies: reply,
        },
      },
      {
        new: true,
      },
    )

    if (thread === null) {
      return res.json({ message: 'Thread does not exist' })
    }

    return res.status(201).json(thread)
  } catch (error) {
    return res.json(error)
  }
}

export const deleteReply: ControllerFn = async (req, res) => {
  try {
    const { threadId, replyId, password } = req.body

    // Get thread
    if (!isValidParam(threadId)) throw new Error()
    const thread = await Thread.getById(threadId)
    if (!thread?.replies?.length) throw new Error()

    // Find the reply and check password
    const reply = thread.replies.filter(
      ({ _id, password: pass }, i) =>
        replyId === objectIdToString(_id) && pass === password,
    )[0]
    if (!reply) throw new Error()

    // update reply
    const newThread = await Reply.updateReply('[deleted]', replyId, threadId)

    return res
      .status(200)
      .json({ message: 'reply successful deleted', thread: newThread })
  } catch (error) {
    return res.json({ message: 'incorrect password' })
  }
}

export const reportReply: ControllerFn = async (req, res) => {
  try {
    const { threadId, replyId } = req.body
    if (!(isValidParam(threadId) && isValidParam(replyId))) {
      throw new Error()
    }

    const query = { _id: threadId, 'replies._id': replyId }
    const update = { $set: { 'replies.$.reported': true } }
    const options = { new: true }
    const thread = await Thread.Thread.findOneAndUpdate(query, update, options)

    return res.status(200).json({ message: 'Success', thread })
  } catch (error) {
    return res.json({ message: 'unable to report' })
  }
}
