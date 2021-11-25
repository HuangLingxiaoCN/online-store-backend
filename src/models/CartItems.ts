import mongoose, { Document } from 'mongoose'
// import { ProductType, productSchema } from './Product'

export type CartItemsType = Document & {
  product: string
  number: number
}

export const cartItemsSchema = new mongoose.Schema<CartItemsType>({
  productId: mongoose.Schema.Types.ObjectId,
  productName: String,
  number: {
    type: Number,
    default: 1,
  },
})

export default mongoose.model('CartItem', cartItemsSchema)
