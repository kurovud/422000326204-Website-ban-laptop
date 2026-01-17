import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ProductList from './pages/ProductList.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import OrderHistory from './pages/OrderHistory.jsx'
import AdminDashboard from './pages/Admin/Dashboard.jsx'
import ManageProduct from './pages/Admin/ManageProduct.jsx'
import ManageOrder from './pages/Admin/ManageOrder.jsx'
import ManageUser from './pages/Admin/ManageUser.jsx'

import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'

function AdminRoute({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== 'admin') return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="app">
          <Header />
          <main className="container py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<OrderHistory />} />

              <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin/products" element={<AdminRoute><ManageProduct /></AdminRoute>} />
              <Route path="/admin/orders" element={<AdminRoute><ManageOrder /></AdminRoute>} />
              <Route path="/admin/users" element={<AdminRoute><ManageUser /></AdminRoute>} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  )
}
