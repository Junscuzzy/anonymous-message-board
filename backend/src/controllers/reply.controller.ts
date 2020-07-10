import Mongoose from 'mongoose'
import { ControllerFn } from '../types'
import * as Thread from '../models/thread.model'
import * as Reply from '../models/reply.model'

function objectIdToString(id: string) {
  return Mongoose.Types.ObjectId(id).toHexString()
}

export const postReply: ControllerFn = async (req, res) => {
  //   const { board } = req.params
  const { text, password, threadId } = req.body

  try {
    if (!threadId || threadId.trim() === '') {
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
    if (!threadId || typeof threadId !== 'string') throw new Error()
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
