import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
        <div className="space-y-5">
          <span className="badge">Hàng chính hãng · Bảo hành rõ ràng</span>
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            TechShop - Nâng cấp sức mạnh PC, laptop & linh kiện theo nhu cầu của bạn
          </h1>
          <p className="text-slate-600">
            Chọn cấu hình tối ưu cho công việc, học tập hoặc gaming. Đội ngũ chuyên gia hỗ trợ tư vấn
            1:1 và dịch vụ lắp ráp, giao hàng nhanh toàn quốc.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link className="btn btn-primary" to="/products">Khám phá sản phẩm</Link>
            <Link className="btn btn-outline" to="/products">Tư vấn cấu hình</Link>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-slate-500">
            <div>
              <p className="text-lg font-semibold text-slate-900">500+</p>
              <p>Sản phẩm chính hãng</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900">98%</p>
              <p>Khách hàng hài lòng</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900">24/7</p>
              <p>Hỗ trợ kỹ thuật</p>
            </div>
          </div>
        </div>
        <div className="card relative overflow-hidden p-6">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 opacity-95" />
          <div className="relative space-y-4 text-white">
            <h3 className="text-xl font-semibold">Gói build PC theo ngân sách</h3>
            <p className="text-sm text-slate-200">
              Nhập ngân sách, mục đích sử dụng và nhận cấu hình tối ưu với linh kiện tương thích.
            </p>
            <div className="grid gap-3 text-sm">
              <div className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3">
                <span>Gaming 2K</span>
                <span className="font-semibold">Từ 25 triệu</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3">
                <span>Thiết kế đồ họa</span>
                <span className="font-semibold">Từ 30 triệu</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3">
                <span>Văn phòng</span>
                <span className="font-semibold">Từ 12 triệu</span>
              </div>
            </div>
            <Link className="btn btn-outline border-white/40 text-white hover:bg-white/10" to="/products">
              Xem gợi ý cấu hình
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { title: 'Laptop chính hãng', desc: 'Dell, Asus, MSI, Lenovo với bảo hành rõ ràng.' },
          { title: 'PC build tuỳ chọn', desc: 'Chọn linh kiện, tối ưu hiệu năng và tản nhiệt.' },
          { title: 'Linh kiện chất lượng', desc: 'CPU, VGA, RAM, SSD, PSU chính hãng.' }
        ].map((item) => (
          <div key={item.title} className="card p-6">
            <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
