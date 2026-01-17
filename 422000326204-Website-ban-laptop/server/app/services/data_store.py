from __future__ import annotations

import itertools
from dataclasses import dataclass, field
from typing import Dict, List


@dataclass
class User:
    id: int
    email: str
    password: str
    full_name: str
    role: str


@dataclass
class Product:
    id: int
    name: str
    sku: str
    price: float
    category: str
    stock: int
    description: str


@dataclass
class OrderItem:
    product_id: int
    qty: int


@dataclass
class Order:
    id: int
    user_id: int
    phone: str
    shipping_address: str
    items: List[OrderItem] = field(default_factory=list)


class InMemoryStore:
    def __init__(self) -> None:
        self._user_id = itertools.count(1)
        self._order_id = itertools.count(1)
        self.users: Dict[int, User] = {}
        self.products: Dict[int, Product] = {}
        self.orders: Dict[int, Order] = {}
        self._seed()

    def _seed(self) -> None:
        admin = self.create_user(
            email="admin@techshop.vn",
            password="Admin@123",
            full_name="Admin",
            role="admin",
        )
        self.create_user(
            email="user@techshop.vn",
            password="User@1234",
            full_name="User",
            role="user",
        )
        sample_products = [
            (
                "Laptop Gaming Titan",
                "LP-GAM-001",
                25900000,
                "laptop",
                10,
                "Laptop gaming hiệu năng cao, RTX 4060, i7 Gen 13.",
            ),
            (
                "PC Creator Pro",
                "PC-CR-010",
                33900000,
                "pc",
                5,
                "PC dựng phim, thiết kế đồ họa, tối ưu render.",
            ),
            (
                "SSD NVMe 1TB",
                "SSD-1TB-900",
                2790000,
                "linhkien",
                30,
                "SSD tốc độ cao, đọc ghi 7000MB/s.",
            ),
        ]
        for idx, item in enumerate(sample_products, start=1):
            self.products[idx] = Product(id=idx, **dict(zip(
                ["name", "sku", "price", "category", "stock", "description"],
                item,
            )))

    def create_user(self, email: str, password: str, full_name: str, role: str) -> User:
        user = User(next(self._user_id), email, password, full_name, role)
        self.users[user.id] = user
        return user

    def find_user_by_email(self, email: str) -> User | None:
        return next((u for u in self.users.values() if u.email == email), None)

    def get_user(self, user_id: int) -> User | None:
        return self.users.get(user_id)

    def list_products(self, query: str | None, category: str | None) -> List[Product]:
        items = list(self.products.values())
        if query:
            items = [p for p in items if query.lower() in p.name.lower()]
        if category:
            items = [p for p in items if p.category == category]
        return items

    def get_product(self, product_id: int) -> Product | None:
        return self.products.get(product_id)

    def create_order(self, user_id: int, phone: str, shipping_address: str, items: List[OrderItem]) -> Order:
        order = Order(next(self._order_id), user_id, phone, shipping_address, items)
        self.orders[order.id] = order
        return order

    def list_orders_for_user(self, user_id: int) -> List[Order]:
        return [o for o in self.orders.values() if o.user_id == user_id]


store = InMemoryStore()
