import request from 'supertest'

import app from './app'

describe('Functional Tests', () => {
  //   describe('API ROUTING FOR /api/threads/:board', () => {
  //     describe('POST', () => {})

  //     describe('GET', () => {})

  //     describe('DELETE', () => {})

  //     describe('PUT', () => {})
  //   })

  //   describe('API ROUTING FOR /api/replies/:board', () => {
  //     describe('POST', () => {})

  //     describe('GET', () => {})

  //     describe('PUT', () => {})

  //     describe('DELETE', () => {})
  //   })

  test('/ => must return "OK"', async () => {
    const res = await request(app).get('/')

    expect(res.status).toEqual(200)
    expect(res.body.message).toBe('OK')
  })
})
