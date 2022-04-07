import express from 'express'

import {
  findOrdersByCustomerEmail,
  createOrder,
  deleteOrder,
} from '../controllers/order'

const router = express.Router()

router.post('/createOrder', createOrder)
router.get('/getOrders/:customerEmail', findOrdersByCustomerEmail)
router.delete('/deleteOrder', deleteOrder)

export default router
