import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../services/product.service.js'
import ProductCard from '../components/ProductCard/ProductCard.jsx'
import Loading from '../components/Loading/Loading.jsx'

const serviceHighlights = [
  { title: 'Giao hàng 2h toàn quốc', desc: 'Đóng gói chống sốc, giao hỏa tốc với đơn vị uy tín.' },
  { title: 'Tư vấn build PC chuyên sâu', desc: 'Chọn linh kiện tương thích, tối ưu hiệu năng và chi phí.' },
  { title: 'AI Chat hỗ trợ 24/7', desc: 'Trả lời tức thì về cấu hình, so sánh laptop và hướng dẫn lắp ráp.' },
  { title: 'Bảo hành chính hãng', desc: 'Hỗ trợ đổi mới 15 ngày, nhận bảo hành tại nhà.' },
]

const builderSteps = [
  'Xác định nhu cầu (gaming, đồ hoạ, văn phòng, lập trình).',
  'Chọn CPU/GPU phù hợp ngân sách, ưu tiên tính tương thích mainboard.',
  'Chọn RAM, SSD, PSU và tản nhiệt cân đối công suất.',
  'Chốt vỏ case, màn hình, ngoại vi rồi kiểm tra lại khả năng nâng cấp.',
  'Đặt hàng, nhận cấu hình lắp ráp & checklist đi kèm.',
]

export default function Home() {
  const [items, setItems] = useState(null)

  useEffect(() => {
    getProducts().then(setItems).catch(() => setItems({ data: [] }))
  }, [])

  const laptops = useMemo(
    () => (items?.data || []).filter(p => p.type === 'laptop').slice(0, 3),
    [items]
  )
  const desktops = useMemo(
    () => (items?.data || []).filter(p => p.type === 'pc').slice(0, 3),
    [items]
  )
  const components = useMemo(
    () => (items?.data || []).filter(p => p.type === 'component').slice(0, 4),
    [items]
  )

  if (!items) return <Loading />

  return (
    <div className="container app-shell">
      <div className="hero">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="pill">TechShop Pro • Laptop • PC • Build linh kiện</div>
          <h1>Website bán laptop và build PC chuyên nghiệp</h1>
          <p>
            Khám phá hệ sinh thái laptop, PC lắp ráp và linh kiện chính hãng.
            Nhận tư vấn cấu hình, so sánh sản phẩm và hướng dẫn build PC hoàn chỉnh
            với trợ lý AI ngay trên website.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary">Xem tất cả sản phẩm</Link>
            <a href="#builder" className="btn btn-outline">Nhận tư vấn build PC</a>
            <a href="#assistant" className="muted">Chat với AI hỗ trợ ngay →</a>
          </div>
          <div className="hero-stats">
            <div className="stat-card">
              <div className="muted">Danh mục</div>
              <b>Laptop, PC, Linh kiện, Phụ kiện</b>
            </div>
            <div className="stat-card">
              <div className="muted">Tính năng bán hàng</div>
              <b>Giỏ hàng • Checkout • Lịch sử đơn • Admin</b>
            </div>
            <div className="stat-card">
              <div className="muted">Hỗ trợ</div>
              <b>AI Chat, hướng dẫn build, so sánh cấu hình</b>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <div className="section-header">
          <div>
            <h3 className="section-title">Dịch vụ nổi bật</h3>
            <p className="section-sub">Đầy đủ chức năng của hệ thống bán laptop/PC hiện đại</p>
          </div>
          <Link to="/products" className="btn btn-outline">Mua ngay</Link>
        </div>
        <div className="service-grid">
          {serviceHighlights.map((s) => (
            <div key={s.title} className="service-card">
              <b>{s.title}</b>
              <p className="muted" style={{ margin: '6px 0 0' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <div className="section-header">
          <div>
            <h3 className="section-title">Laptop nổi bật</h3>
            <p className="section-sub">Mỏng nhẹ, gaming, đồ họa với nhiều phân khúc giá</p>
          </div>
          <Link to="/products" className="muted">Xem tất cả →</Link>
        </div>
        <div className="grid">
          {laptops.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <div className="section-header">
          <div>
            <h3 className="section-title">PC ráp sẵn & workstation</h3>
            <p className="section-sub">Hiệu năng tối ưu cho gaming, edit, AI, office</p>
          </div>
        </div>
        <div className="grid">
          {desktops.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>

      <div id="builder" style={{ marginTop: 18 }}>
        <div className="section-header">
          <div>
            <h3 className="section-title">Hướng dẫn build PC chi tiết</h3>
            <p className="section-sub">AI chatbot sẽ gợi ý linh kiện tương thích và checklist lắp ráp</p>
          </div>
          <a href="#assistant" className="btn btn-primary">Hỏi AI Chat</a>
        </div>
        <div className="guide-steps">
          {builderSteps.map((step, idx) => (
            <div key={step} className="guide-step">
              <div className="badge">Bước {idx + 1}</div>
              <p style={{ margin: '8px 0 0' }}>{step}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <div className="section-header">
          <div>
            <h3 className="section-title">Linh kiện đề xuất</h3>
            <p className="section-sub">CPU, VGA, RAM, SSD, PSU… sẵn sàng cho mọi cấu hình</p>
          </div>
          <Link to="/products" className="muted">Thêm lựa chọn →</Link>
        </div>
        <div className="grid">
          {components.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>
    </div>
  )
}
