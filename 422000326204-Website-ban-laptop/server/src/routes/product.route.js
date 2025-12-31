import { Router } from 'express'
import * as ProductController from '../controllers/product.controller.js'

const r = Router()
r.get('/', ProductController.list)
r.get('/:id', ProductController.detail)

export default r
