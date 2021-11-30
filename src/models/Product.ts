import mongoose, { Document } from 'mongoose'

// Requirements:
// customer(cart inside customer) & product models and schemas

export type ProductType = Document & {
  name: string
  price: number
  genre: string
  numberinStock: number
}

export const productSchema = new mongoose.Schema<ProductType>({
  name: {
    type: String,
    unique: true,
    index: true,
  },
  price: {
    type: Number,
    required: true,
    default: 1,
  },
  genre: {
    type: String,
  },
  numberInStock: {
    type: Number,
    default: 0,
  },
})

export default mongoose.model<ProductType>('Product', productSchema)
