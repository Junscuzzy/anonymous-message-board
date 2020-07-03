import express from 'express'
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'
import bodyParser from 'body-parser'

import router from './router'

const app = express()

// set security HTTP headers
// ✅ Do not allow DNS prefetching
app.use(helmet())

// ✅ Only allow your site to be loading in an iFrame on your own pages.
app.use(helmet.frameguard({ action: 'sameorigin' }))

// ✅ Only allow your site to send the referrer for your own pages
app.use(helmet.referrerPolicy({ policy: 'same-origin' }))

// parse json request body
app.use(bodyParser.json())

// parse urlencoded request body
app.use(bodyParser.urlencoded({ extended: true }))

// 🚀 gzip compression
app.use(compression())

// enable cors
app.use(cors())

// Routes
app.use('/api', router)

// 404 Not Found Middleware
app.use((req, res, next) => {
  res.status(404).type('text').send('Not Found')
})

export default app
