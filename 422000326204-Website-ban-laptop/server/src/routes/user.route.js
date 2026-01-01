import { Router } from 'express'
import { requireAdmin } from '../middlewares/auth.middleware.js'
import * as UserController from '../controllers/user.controller.js'

const r = Router()
r.get('/', requireAdmin, UserController.list)
r.patch('/:id', requireAdmin, UserController.update)

export default r
