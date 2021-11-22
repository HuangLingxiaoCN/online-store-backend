import mongoose, { Document } from 'mongoose'
import Product, { ProductDocument } from './Product'

// Requirements:
// customer(cart inside customer) & product models and schemas

export type CustomerDocument = Document & {
  name: string
  email: string
  password: string
  cart: [ProductDocument]
}

const customerSchema = new mongoose.Schema<CustomerDocument>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: [Product],
  },
})

export default mongoose.model<CustomerDocument>('Customer', customerSchema)
