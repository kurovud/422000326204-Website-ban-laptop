import { useEffect, useMemo, useRef, useState } from 'react'
import { getProducts } from '../../services/product.service.js'
import { fallbackProducts, generateAssistantReply } from '../../utils/assistantEngine.js'

const quickPrompts = [
  'Gợi ý laptop học tập dưới 20 triệu',
  'Build PC gaming 25 triệu có RTX?',
  'Tư vấn cấu hình render 3D và AI cơ bản',
  'Hướng dẫn lắp ráp PC chi tiết cho người mới',
  'So sánh laptop mỏng nhẹ và laptop gaming',
]

export default function AssistantWidget() {
  const [open, setOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Xin chào! Mình là AI Chat TechShop. Bạn cần tư vấn laptop, build PC hay xem linh kiện tương thích?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    getProducts()
      .then(res => setProducts(res.data || []))
      .catch(() => setProducts([]))
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const contextProducts = useMemo(() => {
    if (products && products.length) return products
    return fallbackProducts
  }, [products])

  const sendMessage = (content) => {
    const text = content.trim()
    if (!text) return

    setMessages(msgs => [...msgs, { from: 'user', text }])
    setInput('')
    setLoading(true)

    setTimeout(() => {
      const reply = generateAssistantReply(text, contextProducts)
      setMessages(msgs => [...msgs, { from: 'bot', text: reply }])
      setLoading(false)
    }, 220)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <div className="floating-chat" id="assistant">
      {!open && (
        <button className="chat-toggle" onClick={() => setOpen(true)}>
          🤖 AI Chat
        </button>
      )}

      {open && (
        <div className="chat-panel">
          <div className="chat-header">
            <div>
              <h4 style={{ margin: 0 }}>AI Chat TechShop</h4>
              <div className="muted" style={{ fontSize: 13 }}>Tư vấn sản phẩm, build PC, hướng dẫn lắp ráp</div>
            </div>
            <button className="btn btn-outline" onClick={() => setOpen(false)}>Đóng</button>
          </div>

          <div className="chat-body" ref={scrollRef}>
            <div className="quick-prompts" style={{ marginBottom: 10 }}>
              {quickPrompts.map(p => (
                <span key={p} className="quick-chip" onClick={() => sendMessage(p)}>{p}</span>
              ))}
            </div>
            {messages.map((m, idx) => (
              <div key={idx} className="chat-message">
                <div className={`chat-bubble ${m.from === 'user' ? 'user' : 'bot'}`}>{m.text}</div>
              </div>
            ))}
            {loading && <div className="muted">AI đang soạn câu trả lời...</div>}
          </div>

          <div className="chat-input">
            <form onSubmit={handleSubmit}>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Mô tả nhu cầu: ngân sách, mục đích sử dụng, linh kiện bạn có..."
              />
              <button type="submit" className="btn btn-primary">Gửi</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
