# 💻 TechShop - Website bán Laptop, PC & Linh kiện Build PC
**MSSV/Project Code:** 422000326204  
**Stack chính:** React.js (Vite) + Node.js (Express) + MySQL  

---

## 1) Tổng quan
TechShop là website thương mại điện tử chuyên bán:
- Laptop (văn phòng / gaming / đồ họa)
- PC nguyên bộ (văn phòng / gaming / đồ họa)
- Linh kiện build PC (CPU, Mainboard, RAM, SSD/HDD, VGA, PSU, Case, tản nhiệt...)

Mục tiêu: xây dựng hệ thống theo hướng thực tế doanh nghiệp, tách **Frontend/Backend**, có **xác thực JWT**, **đặt hàng**, và **CSDL chuẩn hóa**.

---

## 2) Tính năng đã có (Skeleton chạy được)
### Người dùng
- Đăng ký / Đăng nhập (JWT)
- Xem danh sách sản phẩm, lọc theo loại, tìm kiếm theo tên/SKU
- Xem chi tiết sản phẩm
- Giỏ hàng (local state)
- Checkout (tạo đơn hàng qua API)
- Xem đơn hàng của tôi

### Backend API
- Auth: register / login / me
- Products: list / detail
- Orders: create / my orders  
- Kiểm tra tồn kho khi tạo đơn, tự trừ tồn kho trong transaction

---

## 3) Cấu trúc thư mục
```
422000326204-Website-ban-laptop/
├── client/        # React + Vite
├── server/        # Node.js + Express
├── database/      # schema.sql + seed.sql
├── docs/          # Test cases (docx)
├── README.md
└── package.json   # workspace + chạy đồng thời FE/BE
```

---

## 4) Yêu cầu môi trường
- Node.js 18+ (khuyến nghị)
- MySQL 8+
- npm 9+  

---

## 5) Cài đặt & chạy dự án
### Bước 1: Tạo database và dữ liệu mẫu
Mở MySQL và chạy lần lượt:
- `database/schema.sql`
- `database/seed.sql`

### Bước 2: Cài đặt dependencies
Tại thư mục gốc:
```bash
npm install
npm run install:all
```

### Bước 3: Cấu hình ENV
- Copy `server/.env.example` -> `server/.env` và chỉnh DB_USER/DB_PASS/DB_NAME cho đúng máy bạn.
- Copy `client/.env.example` -> `client/.env` (mặc định OK)

### Bước 4: Chạy dev (FE + BE cùng lúc)
```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000/api/health`

---

## 6) Tài khoản test (seed)
- Admin: `admin@techshop.vn` / `Admin@123`
- User:  `user@techshop.vn`  / `User@1234`
- Staff (quản lý kho/sản phẩm): `staff@techshop.vn` / `Staff@123`

> Nếu bạn muốn đảm bảo hash đúng, bạn có thể tự đăng ký user bằng API `/api/auth/register`.

---

## 7) API nhanh (mẫu)
### Auth
- `POST /api/auth/register`
```json
{ "email":"abc@gmail.com", "password":"123456", "fullName":"Nguyen Van A" }
```
- `POST /api/auth/login`
```json
{ "email":"admin@techshop.vn", "password":"Admin@123" }
```
- `GET /api/auth/me` (Bearer token)

### Products
- `GET /api/products?q=acer&type=laptop`
- `GET /api/products/:id`

### Orders
- `POST /api/orders` (Bearer token)
```json
{
  "phone":"0900000000",
  "shippingAddress":"HCM - Viet Nam",
  "items":[{"productId":1,"qty":1}, {"productId":4,"qty":2}]
}
```
- `GET /api/orders/my` (Bearer token)

---

## 8) Thiết kế CSDL (chuẩn hóa)
Các bảng chính:
- roles, users
- categories, products, product_images
- orders, order_items
- reviews

File SQL: `database/schema.sql`

---

## 9) Kiểm thử (Test Case)
File test case theo form: `docs/TestCases_TechShop.docx`

---

## 10) Hướng phát triển
- CRUD sản phẩm/đơn hàng cho admin (đã có khung trang FE)
- Upload ảnh sản phẩm (multer + static)
- Thanh toán online (VNPay/MoMo)
- Build PC theo ngân sách (gợi ý cấu hình)
- Review/Rating sản phẩm, gợi ý sản phẩm liên quan
- Dashboard doanh thu & thống kê

---

## 11) License
Phục vụ mục đích học tập/đồ án.
