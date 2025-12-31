import { Router } from 'express'
import * as OrderController from '../controllers/order.controller.js'
import { requireAdmin, requireAuth } from '../middlewares/auth.middleware.js'

const r = Router()
r.post('/', requireAuth, OrderController.create)
r.get('/my', requireAuth, OrderController.my)
r.get('/', requireAdmin, OrderController.listAll)
r.patch('/:id/status', requireAdmin, OrderController.updateStatus)

export default r
