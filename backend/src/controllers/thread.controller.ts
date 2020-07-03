import { ControllerFn } from '../types'
import * as Thread from '../models/thread.model'

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
