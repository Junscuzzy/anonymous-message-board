require('dotenv').config()

export function getMongoUri(dbName?: string) {
  const pass = encodeURI(process.env.MONGO_PASS || '')
  const user = process.env.MONGO_USER || ''
  const cluster = 'cluster-anonymous-messa.wbjnc.mongodb.net'
  const options = 'retryWrites=true&w=majority'

  if (!pass || !user) {
    console.log('missing mongodb credentials')
  }

  return `mongodb+srv://${user}:${pass}@${cluster}/${
    dbName || 'anonymous-board'
  }?${options}`
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
