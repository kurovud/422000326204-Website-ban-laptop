import { createContext, useContext, useMemo, useState } from 'react'
import { useEffect } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([]) // {product, qty}

  useEffect(() => {
    try {
      const raw = localStorage.getItem('cart_items')
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) setItems(parsed)
      }
    } catch (_) {
      // ignore corrupted cache
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart_items', JSON.stringify(items))
  }, [items])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'cart_items') {
        if (!e.newValue) {
          setItems([])
          return
        }
        try {
          const next = JSON.parse(e.newValue)
          if (Array.isArray(next)) setItems(next)
        } catch (_) { /* ignore */ }
      }
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  const add = (product, qty = 1) => {
    setItems(prev => {
      const idx = prev.findIndex(x => x.product.id === product.id)
      if (idx >= 0) {
        const copy = [...prev]
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty }
        return copy
      }
      return [...prev, { product, qty }]
    })
  }

  const updateQty = (productId, qty) => {
    setItems(prev => prev.map(x => {
      if (x.product.id !== productId) return x
      const safeQty = Number(qty)
      return { ...x, qty: safeQty > 0 ? safeQty : 1 }
    }))
  }

  const remove = (productId) => setItems(prev => prev.filter(x => x.product.id !== productId))
  const clear = () => setItems([])

  const count = useMemo(() => items.reduce((s, x) => s + x.qty, 0), [items])
  const total = useMemo(() => items.reduce((s, x) => s + x.qty * Number(x.product.price), 0), [items])

  return (
    <CartContext.Provider value={{ items, add, updateQty, remove, clear, count, total }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
