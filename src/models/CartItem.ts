import mongoose, { Document } from 'mongoose'

export type CartItemType = Document & {
  imageUrl: string
  productName: string
  productId: mongoose.Schema.Types.ObjectId
  price: number
  quantity: number
  ownerEmail: string
}

export const cartItemSchema = new mongoose.Schema<CartItemType>({
  imageUrl: {
    type: String,
    default: '',
  },
  productName: String,
  productId: mongoose.Schema.Types.ObjectId,
  price: Number,
  quantity: {
    type: Number,
    default: 1,
  },
  ownerEmail: String,
})

export default mongoose.model('CartItem', cartItemSchema)
