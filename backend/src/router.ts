import express from 'express'

import * as threadController from './controllers/thread.controller'
import * as replyController from './controllers/reply.controller'

const router = express.Router()

// Threads
router.post('/threads/:board', threadController.createThread)
router.get('/threads/:board', threadController.getThread)
router.delete('/threads/:board', threadController.deleteThread)
router.put('/threads/:board', threadController.reportThread)

// Replies
router.post('/replies/:board', replyController.postReply)
router.delete('/replies/:board', replyController.deleteReply)
router.put('/replies/:board', replyController.reportReply)

export default router
