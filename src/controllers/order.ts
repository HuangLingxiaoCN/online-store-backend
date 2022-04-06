import { Request, Response, NextFunction } from 'express'

import Order from '../models/Order'
import OrderService from '../services/order'
import User from '../models/User'
import UserService from '../services/user'
import { BadRequestError, NotFoundError } from '../helpers/apiError'

// Get all orders with the same customer email (same buyer)
export const findOrdersByCustomerEmail = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { customerEmail } = request.body
    const foundOrders = await OrderService.findOrdersByEmail(customerEmail)

    // if(!foundOrders) {
    //   throw new NotFoundError(`Orders with ${customerEmail} not found`)
    // }
    if (!foundOrders) {
      response.send('not found')
    }

    response.status(200).json(foundOrders)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// Create an order
export const createOrder = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { totalPrice, timestamp, customerEmail, purchasedItems } =
      request.body

    const newOrder = new Order({
      totalPrice,
      timestamp,
      customerEmail,
      purchasedItems,
    })

    // Also need to add the order to user collections
    const user = await User.findOne({ email: customerEmail })
    if (!user) {
      throw new NotFoundError(
        'The user with email ' + customerEmail + ' does not exist'
      )
    }

    user.orders.push(newOrder._id)
    await UserService.saveUser(user)
    await OrderService.createOrder(newOrder)
    response.json(newOrder)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
