import { Router } from 'express'
import * as OrderController from '../controllers/order.controller.js'
import { requireAuth } from '../middlewares/auth.middleware.js'

const r = Router()
r.post('/', requireAuth, OrderController.create)
r.get('/my', requireAuth, OrderController.my)

export default r
