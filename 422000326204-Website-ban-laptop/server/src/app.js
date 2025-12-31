import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
dotenv.config()

import authRoutes from './routes/auth.route.js'
import productRoutes from './routes/product.route.js'
import orderRoutes from './routes/order.route.js'
import { errorHandler } from './middlewares/error.middleware.js'

const app = express()

app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*', credentials: true }))
app.use(express.json())
app.use(morgan('dev'))

app.get('/api/health', (req, res) => res.json({ ok: true, ts: Date.now() }))

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

app.use(errorHandler)

export default app
