import express from 'express'

import * as threadController from './controllers/thread.controller'

const router = express.Router()

// Threads
router.post('/threads/:board', threadController.createThread)

export default router
