import { ControllerFn } from '../types'
import * as Thread from '../models/thread.model'
import * as Reply from '../models/reply.model'

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
