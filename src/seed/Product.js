import mongoose from 'mongoose'

export const productSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    default: 'emptyUrl',
  },
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
})

export default mongoose.model('Product', productSchema)
