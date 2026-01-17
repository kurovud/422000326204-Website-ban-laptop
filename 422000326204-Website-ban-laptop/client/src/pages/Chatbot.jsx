import { useState } from 'react'
import { askChatbot, trainChatbot } from '../services/chatbot.service.js'

export default function Chatbot() {
  const [question, setQuestion] = useState('')
  const [training, setTraining] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')

  const handleAsk = async (e) => {
    e.preventDefault()
    if (!question.trim()) return
    setLoading(true)
    setStatus('')
    try {
      const response = await askChatbot(question)
      setMessages((prev) => [
        ...prev,
        { role: 'user', text: question },
        { role: 'bot', text: response.answer }
      ])
      setQuestion('')
    } catch (err) {
      setStatus('Không thể kết nối chatbot. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  const handleTrain = async () => {
    const lines = training
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
    if (lines.length === 0) return
    setLoading(true)
    setStatus('')
    try {
      await trainChatbot(lines)
      setTraining('')
      setStatus('Đã nạp dữ liệu vào chatbot.')
    } catch (err) {
      setStatus('Không thể nạp dữ liệu. Vui lòng kiểm tra backend.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-slate-900">TechShop Assistant</h2>
        <p className="mt-2 text-sm text-slate-500">Trợ lý AI tư vấn cấu hình, bảo hành và sản phẩm.</p>
        <div className="mt-6 space-y-4">
          {messages.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-sm text-slate-500">
              Hãy đặt câu hỏi như: “Laptop nào phù hợp thiết kế 3D?” hoặc “Chính sách bảo hành ra sao?”.
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={`${msg.role}-${index}`}
                className={`rounded-2xl px-4 py-3 text-sm ${
                  msg.role === 'user'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                <p className="font-semibold">{msg.role === 'user' ? 'Bạn' : 'TechShop AI'}</p>
                <p className="mt-1 whitespace-pre-line">{msg.text}</p>
              </div>
            ))
          )}
        </div>
        <form className="mt-6 flex flex-col gap-3" onSubmit={handleAsk}>
          <textarea
            className="input"
            rows="3"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Nhập câu hỏi cho chatbot..."
          />
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Đang gửi...' : 'Gửi câu hỏi'}
          </button>
        </form>
        {status && <p className="mt-4 text-sm text-slate-500">{status}</p>}
      </div>
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-slate-900">Nạp dữ liệu (RAG)</h3>
        <p className="mt-2 text-sm text-slate-500">
          Dán dữ liệu nội bộ của bạn (mỗi dòng là một đoạn thông tin). Chatbot sẽ dùng dữ liệu này để trả lời.
        </p>
        <textarea
          className="input mt-4"
          rows="8"
          value={training}
          onChange={(e) => setTraining(e.target.value)}
          placeholder="Ví dụ:\nBảo hành 12 tháng tại trung tâm TechShop.\nLaptop gaming phù hợp RTX 4060 trở lên."
        />
        <button className="btn btn-outline mt-4" type="button" onClick={handleTrain} disabled={loading}>
          {loading ? 'Đang nạp...' : 'Nạp dữ liệu'}
        </button>
      </div>
    </div>
  )
}
