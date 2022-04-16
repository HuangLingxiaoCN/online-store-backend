import mongoose, { Document } from 'mongoose'
import dotenv from 'dotenv'
import * as jwt from 'jsonwebtoken'

import { CartItemType, cartItemSchema } from './CartItem'
import { ProductType, productSchema } from './Product'

dotenv.config()
const jwtKey: any = process.env.JWT_SECRET

export type UserType = Document & {
  name: string
  email: string
  password: string
  cart: CartItemType[]
  listings: ProductType[]
  orders: Array<string>
  isAdmin: boolean
  isSuspended: boolean
}

const userSchema = new mongoose.Schema<UserType>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  cart: [cartItemSchema],
  listings: [productSchema],
  orders: [String],
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isSuspended: {
    type: Boolean,
    default: false,
  },
})

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, jwtKey)
  return token
}

export default mongoose.model<UserType>('User', userSchema)
