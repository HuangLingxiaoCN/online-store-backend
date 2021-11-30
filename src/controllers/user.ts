import { Request, Response, NextFunction } from 'express'

import User from '../models/User'
import UserService from '../services/user'
import CartItem from '../models/CartItem'
import Product from '../models/Product'
import { BadRequestError } from '../helpers/apiError'

// POST
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body
    let user = await User.findOne({ email: email })
    if (user) return res.status(400).send('The user has already registered.')

    user = new User({ name, email, password })
    await UserService.create(user)
    res.status(201).send(user)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PATCH
export const addCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productName, email, quantity } = req.body
    const product = await Product.findOne({ name: productName })
    if (!product) return res.status(400).send('The product does not exit.')

    const user = await User.findOne({ email: email })
    if (!user) return res.status(400).send('The user does not exit.')

    const newItem = new CartItem({
      productName,
      price: product.price * quantity,
      quantity,
    })

    console.log(newItem)

    user.cart.push(newItem)
    await UserService.addCartItem(user)
    res.send(user)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
