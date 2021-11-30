import mongoose, { Document } from 'mongoose'

export type CartItemType = Document & {
  productName: string
  price: number
  quantity: number
}

export const cartItemSchema = new mongoose.Schema<CartItemType>({
  productName: String,
  price: Number,
  quantity: {
    type: Number,
    default: 1,
  },
})

export default mongoose.model('CartItem', cartItemSchema)
