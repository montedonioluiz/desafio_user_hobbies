// Dependencies
import dbHandler from './db'
beforeAll(async () => { await dbHandler.connect() })
afterEach(async () => { await dbHandler.clearDatabase() })
afterAll(async () => { await dbHandler.closeDatabase() })

import app from '../app'
import request from 'supertest'

describe('Valid User Tests', () => {
  it('should create a valid user', async () => {
    const createResponse = await request(app)
      .post('/user')
      .send({
        name: "Luiz"
      })

    expect(createResponse.status).toBe(201)
    expect(createResponse.body).toHaveProperty('_id')
    expect(createResponse.body).toHaveProperty('name', 'Luiz')
    expect(createResponse.body).toHaveProperty('hobbies', [])

    const getAllResponse = await request(app)
      .get('/user')

    expect(getAllResponse.status).toBe(200)
    expect(getAllResponse.body).toBeInstanceOf(Array)
    expect(getAllResponse.body).toHaveLength(1)

    expect(getAllResponse.body[0]).toHaveProperty('_id', createResponse.body._id)
    expect(getAllResponse.body[0]).toHaveProperty('name', createResponse.body.name)
    expect(getAllResponse.body[0]).toHaveProperty('hobbies', createResponse.body.hobbies)
  })

  it('should delete a user', async () => {
    const createResponse = await request(app)
      .post('/user')
      .send({
        name: "Luiz"
      })

    expect(createResponse.status).toBe(201)

    const deleteResponse = await request(app)
      .delete(`/user/${createResponse.body._id}`)

    expect(deleteResponse.status).toBe(200)

    const getAllResponse = await request(app)
      .get('/user')

    expect(getAllResponse.status).toBe(200)
    expect(getAllResponse.body).toBeInstanceOf(Array)
    expect(getAllResponse.body).toHaveLength(0)
  })
})