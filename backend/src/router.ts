import express from 'express'

import {
  createThread,
  reportThread,
  getThread,
  deleteThread,
} from './thread/thread.controller'
import { postReply, deleteReply, reportReply } from './reply/reply.controller'

const router = express.Router()

// Threads
router.post('/threads/:board', createThread)
router.get('/threads/:board', getThread)
router.delete('/threads/:board', deleteThread)
router.put('/threads/:board', reportThread)

// Replies
router.post('/replies/:board', postReply)
router.delete('/replies/:board', deleteReply)
router.put('/replies/:board', reportReply)

export default router
