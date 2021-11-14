import mongoose, { Document } from 'mongoose'

export type ProductDocument = Document & {
  name: string
  price: number
  genre: string
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  genre: {
    type: String,
  },
})

export default mongoose.model<ProductDocument>('Product', productSchema)
