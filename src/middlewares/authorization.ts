import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const jwtKey: any = process.env.JWT_SECRET

export default function authorization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token: any = req.header('x-auth-token')
  if (!token) return res.status(401).send('Access Denied. No token provided.')

  try {
    const decoded = jwt.verify(token, jwtKey)
    req.user = decoded
    next()
  } catch (err) {
    res.status(400).send('Invalid token.')
  }
}
