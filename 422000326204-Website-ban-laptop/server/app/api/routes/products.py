from fastapi import APIRouter, HTTPException

from app.services.data_store import store

router = APIRouter()


@router.get("")
async def list_products(q: str | None = None, type: str | None = None):
    items = store.list_products(q, type)
    return [
        {
            "id": item.id,
            "name": item.name,
            "sku": item.sku,
            "price": item.price,
            "category": item.category,
            "stock": item.stock,
            "description": item.description,
        }
        for item in items
    ]


@router.get("/{product_id}")
async def get_product(product_id: int):
    item = store.get_product(product_id)
    if not item:
        raise HTTPException(status_code=404, detail="Product not found")
    return {
        "id": item.id,
        "name": item.name,
        "sku": item.sku,
        "price": item.price,
        "category": item.category,
        "stock": item.stock,
        "description": item.description,
    }
