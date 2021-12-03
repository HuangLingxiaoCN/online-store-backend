import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import * as jwt from 'jsonwebtoken'
import _ from 'lodash'

import User from '../models/User'
import UserService from '../services/user'
import CartItem from '../models/CartItem'
import Product from '../models/Product'
import { BadRequestError } from '../helpers/apiError'

dotenv.config()
const jwtKey: any = process.env.JWT_SECRET

// GET one user
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //
    let user: any = req.user
    user = await UserService.getUser(user._id)
    res.send(user)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// POST
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body
    let user = await User.findOne({ email: email })
    if (user) throw new BadRequestError('The user has already registered.')

    user = new User({ name, email, password })
    // bcrypt
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)

    await UserService.register(user)
    const token = jwt.sign({ _id: user._id }, jwtKey)
    res
      .header('x-auth-token', token)
      .status(201)
      .send(_.pick(user, ['name', 'email']))
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
    if (!product) throw new BadRequestError('The product does not exit.')

    const user = await User.findOne({ email: email })
    if (!user) throw new BadRequestError('The user does not exit.')

    const newItem = new CartItem({
      productName,
      price: product.price * quantity,
      quantity,
    })

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
