import request from 'supertest'
import mongoose from 'mongoose'

import app from './app'
import config, { getMongoUri } from './config'
import { Thread } from './models/thread.model'

describe('Functional Tests', () => {
  describe('API ROUTING FOR /api/threads/:board', () => {
    beforeAll(async () => {
      const url = getMongoUri('functional-tests')
      await mongoose.connect(url, config.mongoose.options)
    })

    afterEach(async () => {
      // Delete all Threads except text contain "keep" word
      await Thread.deleteMany({ text: /^(.(?!(keep)))*$/ })
    })

    describe('POST', () => {
      test('should works with text & password', async done => {
        const res = await request(app).post('/api/threads/board-test').send({
          text: 'Thread test text',
          password: 's3cr3t',
        })

        expect(res.status).toEqual(201)
        expect(res.body.text).toEqual('Thread test text')
        expect(res.body.password).toEqual('s3cr3t')
        expect(res.body).toHaveProperty('_id')
        expect(res.body).toHaveProperty('createdAt')
        expect(res.body).toHaveProperty('bumpedAt')
        expect(res.body.reported).toBeFalsy()
        done()
      })

      test('should return an error if text missing', async done => {
        const res = await request(app).post('/api/threads/board-test').send({
          password: 's3cr3t',
        })

        expect(res.status).toEqual(200)
        expect(res.body.errors.text.properties.message).toEqual(
          'Path `text` is required.',
        )
        done()
      })

      test('should return an error if password missing', async done => {
        const res = await request(app).post('/api/threads/board-test').send({
          text: 'Thread test text',
        })

        expect(res.status).toEqual(200)
        expect(res.body.errors.password.properties.message).toEqual(
          'Path `password` is required.',
        )
        done()
      })
    })

    // describe('GET', () => {})

    // describe('DELETE', () => {})

    // describe('PUT', () => {})
  })

  //   describe('API ROUTING FOR /api/replies/:board', () => {
  //     describe('POST', () => {})

  //     describe('GET', () => {})

  //     describe('PUT', () => {})

  //     describe('DELETE', () => {})
  //   })
})
