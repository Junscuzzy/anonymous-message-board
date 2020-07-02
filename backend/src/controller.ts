// eslint-disable-next-line no-unused-vars
import { Request, Response, NextFunction } from 'express'

type ControllerFn = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Response | Promise<Response>

export const getExample: ControllerFn = (req, res) => {
  return res.status(200).json({ message: 'OK' })
}
