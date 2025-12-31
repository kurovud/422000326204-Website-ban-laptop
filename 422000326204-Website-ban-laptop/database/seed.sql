USE techshop_db;

INSERT IGNORE INTO roles (id, name) VALUES (1,'admin'), (2,'user');

-- Passwords are bcrypt hashes. Replace by running the app and registering, or use these prepared hashes:
-- admin: Admin@123
-- user:  User@1234
INSERT IGNORE INTO users (id, email, password_hash, full_name, role_id) VALUES
(1, 'admin@techshop.vn', '$2b$10$2UA0m1ZvrTLFo8OsAJ8bZuR2YzdiV4jx2x3t77DqVC.6NzzQiOt/q', 'Quản trị viên', 1),
(2, 'user@techshop.vn',  '$2b$10$Y7rz/SCx5WS0xZMe2ZrWHuqJ9q734PrwA8MRpdIsbbc3kxUXWjNMC', 'Khách hàng mẫu', 2);

INSERT IGNORE INTO categories (id, name, parent_id) VALUES
(1,'Laptop',NULL),
(2,'PC',NULL),
(3,'Linh kiện',NULL);

INSERT IGNORE INTO products (id, sku, name, type, category_id, price, stock, description) VALUES
(1,'LAP-ACER-001','Acer Aspire 7 (R5/16GB/512GB/RTX)','laptop',1,18990000,20,'Laptop gaming/đa dụng cho sinh viên, lập trình.'),
(2,'LAP-DELL-002','Dell Inspiron 15 (i5/8GB/512GB)','laptop',1,15990000,15,'Laptop văn phòng, học tập.'),
(3,'PC-GAMING-001','PC Gaming i5 + RTX 4060','pc',2,25990000,8,'PC gaming tầm trung, chơi game 1080p/1440p.'),
(4,'CPU-AMD-5600','CPU AMD Ryzen 5 5600','component',3,2890000,30,'CPU 6 nhân 12 luồng, hiệu năng/giá tốt.'),
(5,'VGA-RTX4060','VGA NVIDIA RTX 4060 8GB','component',3,8990000,10,'Card đồ hoạ cho gaming và đồ hoạ.');
