export default function Footer() {
  return (
    <footer id="support" className="container" style={{ paddingBottom: 40 }}>
      <div className="surface">
        <div className="row" style={{ justifyContent: 'space-between', gap: 18 }}>
          <div style={{ maxWidth: 260 }}>
            <div className="pill">TechShop Pro</div>
            <p className="muted">Giải pháp mua sắm Laptop, PC, linh kiện build máy với tư vấn chuyên sâu, giao hàng nhanh và bảo hành chính hãng.</p>
          </div>
          <div>
            <h4 style={{ margin: '0 0 8px' }}>Hỗ trợ</h4>
            <div className="muted">Hotline: 1900 9000</div>
            <div className="muted">Email: support@techshop.vn</div>
            <div className="muted">Thời gian: 8h00 - 22h00 (T2 - CN)</div>
          </div>
          <div>
            <h4 style={{ margin: '0 0 8px' }}>Chính sách</h4>
            <div className="muted">Giao hàng 2h tại HN/HCM</div>
            <div className="muted">Đổi trả 15 ngày</div>
            <div className="muted">Bảo hành chính hãng</div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #e2e8f0', marginTop: 12, paddingTop: 12 }} className="muted">
          © {new Date().getFullYear()} TechShop - Laptop, PC, Linh kiện Build PC. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
