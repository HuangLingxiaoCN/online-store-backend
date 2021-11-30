import mongoose, { Document } from 'mongoose'
import { CartItemType, cartItemSchema } from './CartItem'

// Requirements:
// customer(cart inside customer) & product models and schemas

// export type ItemType = Document & {
//   productName: string,
//   price: number,
//   quantity: number
// }

// export const itemSchema = new mongoose.Schema<ItemType>({
//   productName: String,
//   price: Number,
//   quantity: {
//     type: Number,
//     default: 1
//   }
// })

// export const Item = mongoose.model('item', itemSchema)

export type UserType = Document & {
  name: string
  email: string
  password: string
  cart: [CartItemType]
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
})

export default mongoose.model<UserType>('User', userSchema)
