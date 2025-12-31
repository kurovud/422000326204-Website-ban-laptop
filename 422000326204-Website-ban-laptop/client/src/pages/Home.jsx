import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="card">
      <h2>Chào mừng đến TechShop</h2>
      <p>Website bán Laptop, PC và Linh kiện Build PC.</p>
      <Link className="btn btn-primary" to="/products">Xem sản phẩm</Link>
    </div>
  )
}
