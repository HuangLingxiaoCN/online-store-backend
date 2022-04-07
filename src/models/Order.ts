import mongoose, { Document } from 'mongoose'

import { CartItemType, cartItemSchema } from './CartItem'

export type OrderType = Document & {
  totalPrice: number
  timestamp: string
  customerEmail: string
  purchasedItems: CartItemType[]
  billingInfo: {
    fullName: string
    country: string
    streetAddress: string
    phoneNumber: string
    postalCode: string
    city: string
    paymentMethod: string
  }
}

const orderSchema = new mongoose.Schema<OrderType>({
  totalPrice: Number,
  timestamp: String,
  customerEmail: String,
  purchasedItems: [cartItemSchema],
  billingInfo: {
    fullName: String,
    country: String,
    streetAddress: String,
    phoneNumber: String,
    postalCode: String,
    city: String,
    paymentMethod: String,
  },
})

export default mongoose.model<OrderType>('Order', orderSchema)
