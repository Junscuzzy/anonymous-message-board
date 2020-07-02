'use strict'

import mongoose from 'mongoose'

import config from './config'
import app from './app'

const connection = connect()

connection
  .on('error', console.log)
  // .on('disconnected', connect)
  .once('open', listen)

// Start server
function listen() {
  app.listen(config.port, () => {
    console.log(`Listening to port ${config.port}`)
  })
}

// Connect to database
function connect() {
  mongoose
    .connect(config.mongoose.uri, config.mongoose.options)
    .then(() => console.log('Connected to MongoDB'))
    .catch(console.log)

  return mongoose.connection
}
