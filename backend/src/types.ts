import { Request, Response, NextFunction } from 'express'

export type ControllerFn = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Response | Promise<Response>
