from fastapi import APIRouter, Depends

from app.api.routes.auth import require_admin
from app.services.data_store import store

router = APIRouter()


@router.get("/users")
async def list_users(_admin=Depends(require_admin)):
    return [
        {
            "id": user.id,
            "email": user.email,
            "fullName": user.full_name,
            "role": user.role,
        }
        for user in store.list_users()
    ]


@router.get("/orders")
async def list_orders(_admin=Depends(require_admin)):
    return [
        {
            "id": order.id,
            "userId": order.user_id,
            "phone": order.phone,
            "shippingAddress": order.shipping_address,
            "items": [{"productId": i.product_id, "qty": i.qty} for i in order.items],
        }
        for order in store.list_orders()
    ]
