import express from 'express'

import {
  getAllOrders,
  getOneOrder,
  findOrdersByCustomerEmail,
  createOrder,
  deleteOrder,
} from '../controllers/order'

const router = express.Router()

router.post('/createOrder', createOrder)
router.get('/getOrders', getAllOrders)
router.get('/getOrder/:orderId', getOneOrder)
router.get('/getOrders/:customerEmail', findOrdersByCustomerEmail)
router.delete('/deleteOrder', deleteOrder)

export default router
