# 💻 TechShop - Website bán Laptop, PC & Linh kiện Build PC
**MSSV/Project Code:** 422000326204  
**Stack chính:** ReactJS + Tailwind + Axios (Frontend) | FastAPI + PostgreSQL + MongoDB (Backend) | WebSocket + LLM (Chatbot)  

---

## 1) Tổng quan
TechShop là website thương mại điện tử chuyên bán:
- Laptop (văn phòng / gaming / đồ họa)
- PC nguyên bộ (văn phòng / gaming / đồ họa)
- Linh kiện build PC (CPU, Mainboard, RAM, SSD/HDD, VGA, PSU, Case, tản nhiệt...)

Mục tiêu: xây dựng hệ thống theo hướng thực tế doanh nghiệp, tách **Frontend/Backend**, có **xác thực JWT**, **đặt hàng**, **Realtime WebSocket**, và **Chatbot** có thể học từ dữ liệu nội bộ.

---

## 2) Kiến trúc mới
- **Frontend:** ReactJS (Vite) + TailwindCSS + Axios
- **Backend:** FastAPI (Python)
- **Database:** PostgreSQL (transactional) + MongoDB (document)
- **Realtime:** WebSocket `/ws/chat`
- **Chatbot:** LLM (GPT/LLaMA), Prompt Engineering, RAG + Vector Store nội bộ
- **Triển khai:** Docker + Nginx (reverse proxy cho `/api` và `/ws`)

---

## 3) Cấu trúc thư mục
```
422000326204-Website-ban-laptop/
├── client/        # React + Vite + Tailwind
├── server/        # FastAPI
├── database/      # dữ liệu mẫu (tham khảo)
├── docs/          # Test cases
├── docker-compose.yml
├── README.md
└── package.json   # chạy FE/BE dev song song
```

---

## 4) Cài đặt & chạy local
### Bước 1: Cài dependencies
```bash
npm install
npm run install:all
```

### Bước 2: Cấu hình ENV backend
```bash
cp server/.env.example server/.env
```

### Bước 3: Chạy dev (FE + BE)
```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000/api/health`

---

## 5) Chạy bằng Docker + Nginx
```bash
docker compose up --build
```

- Frontend (Nginx): `http://localhost:8080`
- Backend (FastAPI): `http://localhost:5000/api/health`

---

## 6) API nhanh
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
  "items":[{"productId":1,"qty":1}, {"productId":2,"qty":2}]
}
```
- `GET /api/orders/my` (Bearer token)

---

## 7) Chatbot (RAG)
### Nạp dữ liệu huấn luyện
- `POST /api/chatbot/train`
```json
{ "texts": ["TechShop chuyên laptop gaming", "Dịch vụ bảo hành 12 tháng"] }
```

### Hỏi đáp
- `POST /api/chatbot/ask`
```json
{ "question": "Bảo hành bao lâu?" }
```

### WebSocket
- `ws://localhost:5000/ws/chat`

---

## 8) Tài khoản test
- Admin: `admin@techshop.vn` / `Admin@123`
- User:  `user@techshop.vn`  / `User@1234`

---

## 9) Ghi chú
- Frontend giữ nguyên cấu trúc trang quản trị (Admin) và hoạt động với backend FastAPI mới.
- PostgreSQL & MongoDB đã cấu hình sẵn trong Docker Compose.
- Nếu muốn dùng GPT/LLaMA thực tế, cấu hình biến môi trường `LLM_PROVIDER` và bổ sung adapter trong `server/app/services/chatbot.py`.

---

## 10) License
Phục vụ mục đích học tập/đồ án.
