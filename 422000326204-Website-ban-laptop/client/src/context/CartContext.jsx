import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([]) // {product, qty}

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
    setItems(prev => prev.map(x => x.product.id === productId ? { ...x, qty } : x))
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
