import mongoose, { Document, Schema } from 'mongoose'
import { ProductType, productSchema } from './Product'

// Requirements:
// customer(cart inside customer) & product models and schemas

export type UserType = Document & {
  name: string
  email: string
  password: string
  // cart: product and number in cart
  cart: Item[]
}

export type Item = Document & {
  product: ProductType
  quantity: number
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
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [
    new Schema({
      product: productSchema,
      quantity: {
        type: Number,
        default: 0,
      },
    }),
  ],
})

export default mongoose.model<UserType>('User', userSchema)
