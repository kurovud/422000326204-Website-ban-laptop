from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from app.api.routes.auth import get_current_user
from app.services.data_store import OrderItem, store

router = APIRouter()


class OrderItemRequest(BaseModel):
    productId: int
    qty: int


class OrderRequest(BaseModel):
    phone: str
    shippingAddress: str
    items: list[OrderItemRequest]


@router.post("")
async def create_order(payload: OrderRequest, current_user=Depends(get_current_user)):
    items = []
    for item in payload.items:
        product = store.get_product(item.productId)
        if not product:
            raise HTTPException(status_code=400, detail=f"Product {item.productId} not found")
        if product.stock < item.qty:
            raise HTTPException(status_code=400, detail="Out of stock")
        product.stock -= item.qty
        items.append(OrderItem(product_id=item.productId, qty=item.qty))

    order = store.create_order(current_user.id, payload.phone, payload.shippingAddress, items)
    return {
        "id": order.id,
        "items": [{"productId": i.product_id, "qty": i.qty} for i in order.items],
    }


@router.get("/my")
async def list_my_orders(current_user=Depends(get_current_user)):
    orders = store.list_orders_for_user(current_user.id)
    return [
        {
            "id": order.id,
            "phone": order.phone,
            "shippingAddress": order.shipping_address,
            "items": [{"productId": i.product_id, "qty": i.qty} for i in order.items],
        }
        for order in orders
    ]
