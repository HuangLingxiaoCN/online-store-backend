import request from 'supertest'

import { ProductType } from '../src/models/Product'
import app from '../src/app'
import connect, { MongodHelper } from './db-helper'

const nonExistingProductId = '5e57b77b5744fa0b461c7906'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWE4ZDE1MzJmZGEyNzNkYTg4NGE1NWQiLCJpYXQiOjE2Mzg0ODM0MDF9.ZcHNp1UYz6-mw3O3-QzN6K03tmxD6_IfZly8OFsjMEs'

async function createProduct(override?: Partial<ProductType>) {
  let product = {
    imageUrl: 'http://imageUrl.com',
    name: 'razor',
    price: 100,
    description: 'Best razor in the world',
    genre: 'electronics',
    numberInStock: 30,
  }

  if (override) {
    product = { ...product, ...override }
  }

  return await request(app).post('/api/products').set('x-auth-token', token).send(product)
}

describe('product controller', () => {
  let mongodHelper: MongodHelper

  beforeAll(async () => {
    mongodHelper = await connect()
  })

  afterEach(async () => {
    await mongodHelper.clearDatabase()
  })

  afterAll(async () => {
    await mongodHelper.closeDatabase()
  })

  it('should create a product', async () => {
    const res = await createProduct()
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body.name).toBe('razor')
    expect(res.body.genre).toBe('electronics')
    expect(res.body.price).toBe(100)
  })

  it('should not create a product with wrong data', async () => {
    const res = await request(app).post('/api/products').set('x-auth-token', token).send({
      // These fields should be included
      // name: 'razor',
      imageUrl: 'http://imageUrl.com',
      price: 100,
      description: 'Best razor in the world',
      genre: 'electronics',
      numberInStock: 30,
    })
    expect(res.status).toBe(400)
  })

  it('should get back an existing product', async () => {
    let res = await createProduct()
    expect(res.status).toBe(200)

    const productId = res.body._id
    res = await request(app).get(`/api/products/${productId}`)

    expect(res.body._id).toEqual(productId)
  })

  it('should not get back a non-existing product', async () => {
    const res = await request(app).get(`/api/products/${nonExistingProductId}`)
    expect(res.status).toBe(404)
  })

  it('should get back all products', async () => {
    const res1 = await createProduct({
      name: 'razor1',
      price: 100,
    })
    const res2 = await createProduct({
      name: 'razor2',
      price: 140,
    })

    const res3 = await request(app).get('/api/products')

    expect(res3.body.length).toEqual(2)
    expect(res3.body[0]._id).toEqual(res1.body._id)
    expect(res3.body[1]._id).toEqual(res2.body._id)
  })

  it('should update an existing product', async () => {
    let res = await createProduct()
    expect(res.status).toBe(200)

    const productId = res.body._id
    const update = {
      name: 'super razor',
      price: 200,
    }

    res = await request(app).put(`/api/products/${productId}`).set('x-auth-token', token).send(update)

    expect(res.status).toEqual(200)
    expect(res.body.name).toEqual('super razor')
    expect(res.body.price).toEqual(200)
  })

  it('should delete an existing product', async () => {
    let res = await createProduct()
    expect(res.status).toBe(200)
    const productId = res.body._id

    res = await request(app).delete(`/api/products/${productId}`).set('x-auth-token', token)

    expect(res.status).toEqual(200)
  })
})
