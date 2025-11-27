import { Request, Response } from 'express'
import http from 'http'
import jwt from 'jsonwebtoken'
import { UserOrm } from '../../service/User/repository/orm/UserOrm'

import { ContextServices, createContextServices } from '.'

export interface SharedContext {
  headers: http.IncomingHttpHeaders
  request: Request
  response: Response
  services: ContextServices
  user: UserOrm | null
  userId: string | null
}

const extractUserFromRequest = async (req: Request, services: ContextServices): Promise<{ user: UserOrm | null; userId: string | null }> => {
  try {
    // Check both lowercase and capitalized header names
    const authHeader = req.headers.authorization || req.headers.Authorization || (req.headers as any)['authorization']
    
    if (!authHeader || typeof authHeader !== 'string') {
      if (process.env.NODE_ENV === 'development') {
        console.log('No authorization header found')
      }
      return { user: null, userId: null }
    }

    // Remove 'Bearer ' prefix (case-insensitive)
    const token = authHeader.replace(/^Bearer\s+/i, '').trim()
    if (!token) {
      if (process.env.NODE_ENV === 'development') {
        console.log('No token found in authorization header')
      }
      return { user: null, userId: null }
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY || '')
      if (typeof decoded === 'string' || !decoded.email) {
        if (process.env.NODE_ENV === 'development') {
          console.log('Invalid token payload - no email')
        }
        return { user: null, userId: null }
      }

      const user = await services.userRepository.getUserByToken(token)
      if (!user) {
        if (process.env.NODE_ENV === 'development') {
          console.log('User not found for token')
        }
        return { user: null, userId: null }
      }

      if (process.env.NODE_ENV === 'development') {
        console.log('User extracted successfully:', user.id, user.email)
      }

      return { user, userId: user?.id || null }
    } catch (jwtError: any) {
      // JWT verification failed
      if (process.env.NODE_ENV === 'development') {
        console.error('JWT verification error:', jwtError.message)
      }
      return { user: null, userId: null }
    }
  } catch (error: any) {
    // If token is invalid or missing, return null user
    // Log error in development for debugging
    if (process.env.NODE_ENV === 'development') {
      console.error('Error extracting user from request:', error?.message || error)
    }
    return { user: null, userId: null }
  }
}

export const createContext = async (req: Request, res: Response): Promise<SharedContext> => {
  const services = await createContextServices()
  const { user, userId } = await extractUserFromRequest(req, services)
  
  return {
    headers: req.headers,
    request: req,
    response: res,
    services,
    user,
    userId,
  }
}
