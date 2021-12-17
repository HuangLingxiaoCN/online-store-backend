import mongoose, { Document } from 'mongoose'

// Requirements:
// customer(cart inside customer) & product models and schemas

export type ProductType = Document & {
  imageUrl: string
  name: string
  price: number
  description: string
  genre: string
  numberInStock: number
  // owner of the posted product
  owner: mongoose.Types.ObjectId
}

export const productSchema = new mongoose.Schema<ProductType>({
  imageUrl: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 1,
  },
  description: {
    type: String,
    default:
      'Donec sollicitudin molestie malesuada. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Nulla quis lorem ut libero malesuada feugiat. Donec sollicitudin molestie malesuada.',
  },
  genre: {
    type: String,
  },
  numberInStock: {
    type: Number,
    default: 1,
  },
  owner: mongoose.Types.ObjectId,
})

export default mongoose.model<ProductType>('Product', productSchema)
