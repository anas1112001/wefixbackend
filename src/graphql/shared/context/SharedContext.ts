import { Request, Response } from 'express'
import http from 'http'

import { ContextServices, createContextServices } from '.'

export interface SharedContext {
  headers: http.IncomingHttpHeaders
  request: Request
  response: Response
  services: ContextServices
}

export const createContext = async (req: Request, res: Response): Promise<SharedContext> => {
  const services = await createContextServices()
  return {
    headers: req.headers,
    request: req,
    response: res,
    services,
  }
}
