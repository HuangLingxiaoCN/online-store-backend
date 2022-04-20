import { NotFoundError } from '../helpers/apiError'
import Order, { OrderType } from '../models/Order'

const createOrder = async (order: OrderType) => {
  return order.save()
}

const getAllOrders = async (): Promise<OrderType[]> => {
  return Order.find()
}

const getOneOrder = async (orderId: string): Promise<OrderType> => {
  const foundOrder = await Order.findById(orderId)

  if (!foundOrder) {
    throw new NotFoundError('The order ' + orderId + ' does not exist')
  }

  return foundOrder
}

const findOrdersByEmail = async (customerEmail: string) => {
  const foundOrders = await Order.find({ customerEmail: customerEmail })

  if (!foundOrders) {
    throw new Error('The customer has no order history')
  }

  return foundOrders
}

const findOrderById = async (orderId: string) => {
  const foundOrder = await Order.findById(orderId)

  if (!foundOrder) {
    throw new NotFoundError('The order ' + orderId + ' does not exist')
  }

  return foundOrder
}

const deleteOrderById = async (orderId: string) => {
  await Order.findByIdAndDelete(orderId)
}

export default {
  getAllOrders,
  getOneOrder,
  createOrder,
  findOrdersByEmail,
  findOrderById,
  deleteOrderById,
}
