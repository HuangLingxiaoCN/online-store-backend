import express from 'express'

import { findOrdersByCustomerEmail, createOrder } from '../controllers/order'

const router = express.Router()

router.post('/createOrder', createOrder)
router.get('/getOrders', findOrdersByCustomerEmail)

export default router
