import { Router } from 'express'
import * as ProductController from '../controllers/product.controller.js'
import { requireAdminOrStaff } from '../middlewares/auth.middleware.js'

const r = Router()
r.get('/', ProductController.list)
r.get('/:id', ProductController.detail)
r.post('/', requireAdminOrStaff, ProductController.create)
r.put('/:id', requireAdminOrStaff, ProductController.update)
r.delete('/:id', requireAdminOrStaff, ProductController.remove)

export default r
