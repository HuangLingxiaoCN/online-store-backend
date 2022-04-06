import mongoose, { Document } from 'mongoose'

import { CartItemType, cartItemSchema } from './CartItem'

export type OrderType = Document & {
  totalPrice: number
  timestamp: string
  customerEmail: string
  purchasedItems: CartItemType[]
}

const orderSchema = new mongoose.Schema<OrderType>({
  totalPrice: Number,
  timestamp: String,
  customerEmail: String,
  purchasedItems: [cartItemSchema],
})

export default mongoose.model<OrderType>('Order', orderSchema)
