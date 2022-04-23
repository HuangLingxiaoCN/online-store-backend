import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import * as jwt from 'jsonwebtoken'
import _ from 'lodash'

import User from '../models/User'
import UserService from '../services/user'
import ProductService from '../services/product'
import CartItem from '../models/CartItem'
import Product from '../models/Product'
import {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} from '../helpers/apiError'

// email verification
import sendEmail from '../email/email.send'
import templates from '../email/email.templates'
import msgs from '../email/email.msgs'

dotenv.config()
const jwtKey: any = process.env.JWT_SECRET

// ------------------------------------User Management -------------------------------------------------//

// GET the user
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //
    let user: any = req.user
    user = await UserService.getUser(user._id)
    res.status(200).send(user)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// Get all
export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await UserService.getAll()
    res.status(200).send(users)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// Update user
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId
    const update = req.body
    const updatedUser = await UserService.updateUser(userId, update)
    res.status(200).send(updatedUser)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// register new user
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

    await UserService.saveUser(user)
    const token = jwt.sign({ _id: user._id }, jwtKey)

    // Send the new user a confirmation email
    // !!! Only working locally !!!
    // !!! Not working on Heroku !!!

    sendEmail(user.email, templates.confirm(user._id))
      .then(() => {
        res
          .header('x-auth-token', token)
          .status(201)
          .json({
            msg: msgs.confirm,
            data: _.pick(user, ['name', 'email', '_id']),
          })
      })
      .catch((err) => console.log(err))

    // res
    //   .header('x-auth-token', token)
    //   .status(201)
    //   .send(_.pick(user, ['name', 'email', '_id']))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// Confirm user email
export const confirmEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const user = await User.findById(id)
    if (!user) throw new NotFoundError('The user does not exist.')

    if (user.confirmed) {
      res.json({ msg: msgs.alreadyConfirmed })
    }

    User.findByIdAndUpdate(id, { confirmed: true })
      .then(() => res.json({ msg: msgs.confirmed }))
      .catch((err) => console.log(err))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// Delete user
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId
    const deletedUser = await UserService.deleteUser(userId)
    res.status(200).send(deletedUser)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// Toggle suspension of user account
export const ToggleUserSuspension = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { adminEmail, targetEmail } = req.body
    const administrator = await User.findOne({ email: adminEmail })
    if (!administrator)
      throw new NotFoundError('The administrator does not exit.')
    if (!administrator.isAdmin) {
      throw new ForbiddenError(
        'The operation is only allowed for administrator'
      )
    }

    const toggledUser = await User.findOne({ email: targetEmail })
    if (!toggledUser) throw new NotFoundError('The user does not exit.')
    toggledUser.isSuspended = !toggledUser.isSuspended
    await UserService.saveUser(toggledUser)
    const allUsers = await UserService.getAll()
    res.status(200).send(allUsers)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// ------------------------------------Cart Management -------------------------------------------------//

// PATCH new cart item
// And if the cart item exists, plus one to the quantity
export const addCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId, email } = req.body
    const product = await ProductService.findById(productId)
    if (!product) throw new NotFoundError('The product does not exit.')

    const user = await User.findOne({ email: email })
    if (!user) throw new NotFoundError('The user does not exit.')

    // Find the cart item
    const cartItem = user.cart.find(
      (item) => item.productId.toString() == productId
    )

    if (cartItem) {
      const singlePrice = cartItem.price / cartItem.quantity
      cartItem.quantity++
      cartItem.price = cartItem.quantity * singlePrice
      await UserService.handleCartItem(user)
      res.send(cartItem)
    } else {
      const newItem = new CartItem({
        imageUrl: product.imageUrl,
        productName: product.name,
        productId,
        price: product.price,
        quantity: 1,
        ownerEmail: product.ownerEmail,
      })

      user.cart.push(newItem)
      await UserService.handleCartItem(user)
      res.send(newItem)
    }
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// Modify one cart item's quantity
export const modifyCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, itemId, quantity } = req.body
    const user = await User.findOne({ email: email })
    if (!user) throw new NotFoundError('The user does not exit.')

    const cartItem = user.cart.find((item) => item._id.toString() === itemId)
    if (!cartItem) throw new NotFoundError('The cart item does not exist.')

    // get the single price of product
    const product = await Product.findOne({ name: cartItem.productName })
    if (!product)
      throw new NotFoundError(
        'The product with the same cartItem name does not exit.'
      )

    cartItem.quantity = quantity
    cartItem.price = quantity * product.price

    await UserService.handleCartItem(user)
    res.send(cartItem)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PATCH Increment cart item
export const incrementCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, itemId } = req.body
    const user = await User.findOne({ email: email })
    if (!user) throw new NotFoundError('The user does not exit.')

    const cartItem = user.cart.find((item) => item._id.toString() === itemId)
    if (!cartItem) throw new NotFoundError('The cart item does not exist.')

    const singlePrice = cartItem.price / cartItem.quantity
    cartItem.quantity++
    cartItem.price = cartItem.quantity * singlePrice
    await UserService.handleCartItem(user)
    res.send(cartItem)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PATCH Decrement cart item
export const decrementCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, itemId } = req.body
    const user = await User.findOne({ email: email })
    if (!user) throw new NotFoundError('The user does not exit.')

    const cartItem = user.cart.find((item) => item._id.toString() === itemId)
    if (!cartItem) throw new NotFoundError('The cart item does not exist.')

    const singlePrice = cartItem.price / cartItem.quantity
    cartItem.quantity--
    cartItem.price = cartItem.quantity * singlePrice
    await UserService.handleCartItem(user)
    res.send(cartItem)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE delete a cart item
export const deleteCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, itemId } = req.body
    const user = await User.findOne({ email: email })
    if (!user) throw new NotFoundError('The user does not exit.')

    const cartItem = user.cart.find((item) => item._id.toString() === itemId)
    if (!cartItem) throw new NotFoundError('The cart item does not exist.')

    const index = user.cart.indexOf(cartItem)
    user.cart.splice(index, 1)
    await UserService.handleCartItem(user)
    res.send(cartItem)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// Clear ALL cart items
export const clearCartItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email: email })
    if (!user) throw new NotFoundError('The user does not exit.')

    user.cart = []
    await UserService.handleCartItem(user)
    res.send(user.cart)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// ------------------------------------Listing Management -------------------------------------------------//

// PATCH new listing item
export const addListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { product } = req.body
    const {
      imageUrl,
      price,
      description,
      numberInStock,
      name,
      genre,
      ownerEmail,
    } = product
    const user = await User.findOne({ email: ownerEmail })
    if (!user) throw new NotFoundError('The user does not exit.')

    const newListing = new Product({
      imageUrl,
      price,
      description,
      numberInStock,
      name,
      genre,
      ownerEmail,
    })

    user.listings.push(newListing)
    await UserService.handleListing(user)
    await ProductService.create(newListing)
    res.status(201).send(newListing)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE a listing
export const removeListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId, email } = req.body
    const product = await ProductService.findById(productId)
    if (!product) throw new NotFoundError('Product not found')

    const user = await User.findOne({ email: email })
    if (!user) throw new NotFoundError('The user does not exit.')

    const deletedListing = user.listings.find(
      (l) => l._id.toString() === productId
    )
    if (!deletedListing)
      throw new NotFoundError('The listing does not exist on this user.')
    const idx = user.listings.indexOf(deletedListing)
    user.listings.splice(idx, 1)

    await UserService.handleListing(user)
    await ProductService.deleteProduct(productId)
    res.send(deletedListing)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// UPDATE a listing
export const updateListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId, update, email } = req.body
    const product = await ProductService.findById(productId)
    if (!product) throw new NotFoundError('Product not found')

    const user = await User.findOne({ email: email })
    if (!user) throw new NotFoundError('The user does not exit.')

    const updatedListing = user.listings.find(
      (l) => l._id.toString() === productId
    )
    if (!updatedListing)
      throw new NotFoundError('the updatedListing does not exit.')
    const idx = user.listings.indexOf(updatedListing)

    // create a copy of updated listing and update value
    const newListing: any = _.merge(user.listings[idx], update)
    console.log(newListing)

    // Replace the old listing with new listing
    // user.listings.splice(idx, 1, newListing)
    user.listings[idx] = newListing

    await UserService.handleListing(user)
    await ProductService.update(productId, update)
    res.send(newListing)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
