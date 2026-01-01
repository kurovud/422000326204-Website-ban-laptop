import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

import authRoutes from './routes/auth.route.js'
import productRoutes from './routes/product.route.js'
import orderRoutes from './routes/order.route.js'
import userRoutes from './routes/user.route.js'
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
app.use('/api/users', userRoutes)

// Serve frontend build (SPA) when deployed together
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const clientDist = path.resolve(__dirname, '../../client/dist')
const clientEntry = path.join(clientDist, 'index.html')
const hasClientBuild = fs.existsSync(clientEntry)

if (hasClientBuild) {
  app.use(express.static(clientDist))
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next()
    return res.sendFile(clientEntry)
  })
} else {
  // Friendly hint instead of "Cannot GET /admin" when build assets are missing
  app.get(['/', '/admin*'], (req, res) => {
    return res.status(503).json({
      message: 'Frontend build is missing. Run "npm run build -w client" and restart the server to load the admin UI.'
    })
  })
}

app.use(errorHandler)

export default app
