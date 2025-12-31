import { Router } from 'express'
import * as ProductController from '../controllers/product.controller.js'
import { requireAdmin } from '../middlewares/auth.middleware.js'

const r = Router()
r.get('/', ProductController.list)
r.get('/:id', ProductController.detail)
r.post('/', requireAdmin, ProductController.create)
r.put('/:id', requireAdmin, ProductController.update)
r.delete('/:id', requireAdmin, ProductController.remove)

export default r
