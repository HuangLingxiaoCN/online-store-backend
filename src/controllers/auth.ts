import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'

import User from '../models/User'
import { BadRequestError } from '../helpers/apiError'

// POST
export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (!user) return res.status(400).send('Invalid email or password.')

    const passwordIsValid = bcrypt.compare(password, user.password)
    if (!passwordIsValid)
      return res.status(400).send('Invalid email or password.')

    res.status(200).send('Login successful.')
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
