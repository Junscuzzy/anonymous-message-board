import { ControllerFn } from '../types'
import * as Thread from '../models/thread.model'

// Utils
// Remove "password" & "reported" fields from threads & replies recursively
function excludePassAReport(threads: Thread.IThread[]) {
  return threads.map(({ createdAt, bumpedAt, _id, board, text, replies }) => ({
    createdAt,
    bumpedAt,
    _id,
    board,
    text,
    replies: replies.map(({ text, createdAt }) => ({ text, createdAt })),
  }))
}

// Routes Methods

export const createThread: ControllerFn = async (req, res) => {
  const { board } = req.params
  const { text, password } = req.body
  try {
    const results = await Thread.create({ board, text, password })
    return res.status(201).json(results)
  } catch (error) {
    return res.json(error)
  }
}

// If query.threadId => [thread] else => [thread, thread, ...]
export const getThread: ControllerFn = async (req, res) => {
  const { board } = req.params
  const { threadId } = req.query
  let results: any

  try {
    if (threadId && typeof threadId === 'string') {
      const thread = await Thread.getById(threadId)
      results = [thread]
    } else {
      const threads = await Thread.getRecentThreads(board)

      // Get the 3 lasts replies
      results = threads.map((thread: Thread.IThread) => {
        const tmp = thread
        tmp.replies = tmp.replies.slice(0, 3)
        return tmp
      })
    }

    // Skip "password" & "reported" fields
    results = excludePassAReport(results)

    return res.status(200).json(results || [])
  } catch (error) {
    return res.json([])
  }
}

export const deleteThread: ControllerFn = async (req, res) => {
  try {
    const { threadId, password } = req.body

    // Get thread
    if (!threadId || typeof threadId !== 'string') {
      throw new Error()
    }
    const thread = await Thread.getById(threadId)

    // Check password
    if (password !== thread?.password) {
      throw new Error()
    }

    const deleted = await Thread.deleteThread(thread?._id)

    // Check successful deleted
    if (!deleted) {
      throw new Error()
    }

    return res.status(200).json({ message: 'thread successful deleted' })
  } catch (error) {
    return res.json({ message: 'incorrect password' })
  }
}

export const reportThread: ControllerFn = async (req, res) => {
  try {
    const { threadId } = req.body
    if (!threadId || typeof threadId !== 'string') {
      throw new Error()
    }

    const update = { reported: true }
    const thread = await Thread.Thread.findByIdAndUpdate(threadId, update, {
      new: true,
    })

    return res.status(200).json({ message: 'Success', thread })
  } catch (error) {
    return res.json({ message: 'unable to report' })
  }
}
