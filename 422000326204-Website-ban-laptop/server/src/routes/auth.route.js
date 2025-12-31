import { Router } from 'express'
import * as AuthController from '../controllers/auth.controller.js'
import { requireAuth } from '../middlewares/auth.middleware.js'

const r = Router()
r.post('/register', AuthController.register)
r.post('/login', AuthController.login)
r.get('/me', requireAuth, AuthController.me)

export default r
