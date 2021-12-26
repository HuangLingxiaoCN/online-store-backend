import express from 'express'
import dotenv from 'dotenv'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import lusca from 'lusca'
import compression from 'compression'
import cors from 'cors'

import productRouter from './routers/product'
import userRouter from './routers/user'
import auth from './routers/auth'

dotenv.config()
const app = express()
app.use(cors())

if (!process.env.JWT_SECRET) {
  console.log('FATAL ERROR: JWT_SECRET is not defined.')
  process.exit(1)
}

app.set('port', process.env.PORT || 3000)
app.use(express.json())
// Use common 3rd-party middlewares
app.use(apiContentType)
app.use(compression())
app.use(express.json())
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))

app.use('/api/products', productRouter)
app.use('/api/user', userRouter)
app.use('/api/auth', auth)

// Custom API error handler
app.use(apiErrorHandler)

export default app
