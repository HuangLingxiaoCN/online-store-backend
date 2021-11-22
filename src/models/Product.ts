import mongoose, { Document } from 'mongoose'

// Requirements:
// customer(cart inside customer) & product models and schemas

export type ProductDocument = Document & {
  name: string
  price: number
  genre: string
  numberinStock: number
}

const productSchema = new mongoose.Schema<ProductDocument>({
  name: {
    type: String,
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

export default mongoose.model<ProductDocument>('Product', productSchema)
