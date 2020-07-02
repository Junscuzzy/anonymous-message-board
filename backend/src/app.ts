import express from 'express'
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'
import bodyParser from 'body-parser'

import router from './router'

const app = express()

// set security HTTP headers
app.use(helmet())

// parse json request body
app.use(bodyParser.json())

// parse urlencoded request body
app.use(bodyParser.urlencoded({ extended: true }))

// gzip compression
app.use(compression())

// enable cors
app.use(cors())

// Routes
app.use(router)

// 404 Not Found Middleware
app.use((req, res, next) => {
  res.status(404).type('text').send('Not Found')
})

export default app
