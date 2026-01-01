import ManageProduct from './ManageProduct.jsx'
import AdminLayout from '../../components/Admin/AdminLayout.jsx'

const workflowSteps = [
  { title: 'Tiếp nhận & kiểm tra SKU', detail: 'Xác minh yêu cầu tạo/sửa, kiểm tra SKU trùng, rà soát loại sản phẩm (laptop/pc/linh kiện).' },
  { title: 'Cập nhật tồn kho & giá', detail: 'Nhập số lượng khả dụng, giá bán lẻ, mô tả ngắn hỗ trợ CSKH và trang sản phẩm.' },
  { title: 'Rà soát chất lượng dữ liệu', detail: 'Đảm bảo tên đầy đủ, viết hoa SKU, mô tả rõ cấu hình; kiểm tra tồn kho tối thiểu cho hàng hot.' },
  { title: 'Xác nhận & công bố', detail: 'Lưu thay đổi, xác nhận hiển thị sản phẩm; thông báo bộ phận CSKH/kho khi biến động tồn kho.' },
]

const guardrails = [
  'Mọi thao tác thêm/sửa/xoá yêu cầu đăng nhập vai trò admin/staff.',
  'Không nhập giá hoặc tồn kho âm; đảm bảo SKU duy nhất.',
  'Ưu tiên cập nhật mô tả rõ ràng để đồng bộ giữa kho, CSKH và website.',
]

export default function InventoryFlow() {
  return (
    <AdminLayout
      title="Quy trình & quản lý hàng hóa"
      subtitle="Thao tác đúng quy trình: tiếp nhận yêu cầu → kiểm tra SKU → cập nhật tồn kho/giá → công bố."
    >
      <div className="card" style={{ marginBottom: 14 }}>
        <h3 style={{ margin: '0 0 6px' }}>Quy trình nghiệp vụ quản lý sản phẩm</h3>
        <p className="muted" style={{ marginTop: 0 }}>
          Dành cho nhân viên kho/merchandising: bám sát quy trình FPTShop (tiếp nhận → kiểm tra → cập nhật →
          công bố) để đảm bảo dữ liệu sản phẩm luôn đồng bộ và chính xác.
        </p>

        <div className="grid" style={{ marginTop: 12 }}>
          {workflowSteps.map((step, idx) => (
            <div key={step.title} className="service-card">
              <div className="badge">Bước {idx + 1}</div>
              <b style={{ display: 'block', marginTop: 8 }}>{step.title}</b>
              <p className="muted" style={{ margin: '6px 0 0' }}>{step.detail}</p>
            </div>
          ))}
        </div>

        <div className="alert info" style={{ marginTop: 12 }}>
          <b>Nguyên tắc vận hành:</b>
          <ul style={{ margin: '8px 0 0 18px', color: '#0f172a' }}>
            {guardrails.map((g, idx) => <li key={idx}>{g}</li>)}
          </ul>
        </div>
      </div>

      <ManageProduct embedded />
    </AdminLayout>
  )
}
