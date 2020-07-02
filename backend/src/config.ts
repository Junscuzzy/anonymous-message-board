require('dotenv').config()

function getMongoUri() {
  const pass = encodeURI(process.env.MONGO_PASS || '')
  const user = process.env.MONGO_USER || ''
  const cluster = 'cluster-anonymous-messa.wbjnc.mongodb.net'
  const dbName = 'anonymous-board'
  const options = 'retryWrites=true&w=majority'
  if (!pass || !user) {
    console.log('missing mongodb credentials')
  }
  return `mongodb+srv://${user}:${pass}@${cluster}/${dbName}?${options}`
}

export const mongoose = {
  uri: getMongoUri(),
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
}

export const port = process.env.PORT || 3000

export default {
  mongoose,
  port,
}
