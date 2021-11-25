import { Request, Response, NextFunction } from 'express'

import CartItems from '../models/CartItems'
import CartItemsService from '../services/cartItems'
import Product from '../models/Product'
import { BadRequestError } from '../helpers/apiError'

// GET ALL
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await CartItemsService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET ONE /cartItems/:cartItemId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await CartItemsService.findById(req.params.cartItemId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// POST
export const createcCartItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId, number } = req.body
    const product = await Product.findById(productId)
    if (!product) return res.status(404).send('Invalid product')

    const cart = new CartItems({
      productId,
      productName: product.name,
      number,
    })

    await CartItemsService.create(cart)
    res.status(201).json(cart)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PATCH /cartItems/:cartItemId
export const updateCartItemNumber = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartItemId = req.params.cartItemId
    const updateNumber = req.body.number
    const updatedCartItem = await CartItemsService.update(
      cartItemId,
      updateNumber
    )
    res.json(updatedCartItem)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE /cartItems/:cartItemId
export const deleteCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await CartItemsService.deleteCartItem(req.params.cartItemId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
