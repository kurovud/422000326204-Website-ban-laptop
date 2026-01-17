from datetime import datetime, timedelta

import jwt
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel

from app.core.config import settings
from app.services.data_store import store

router = APIRouter()
security = HTTPBearer()


class LoginRequest(BaseModel):
    email: str
    password: str


class RegisterRequest(BaseModel):
    email: str
    password: str
    fullName: str


def create_token(user_id: int, role: str) -> str:
    payload = {
        "sub": user_id,
        "role": role,
        "exp": datetime.utcnow() + timedelta(hours=12),
    }
    return jwt.encode(payload, settings.jwt_secret, algorithm="HS256")


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, settings.jwt_secret, algorithms=["HS256"])
    except jwt.PyJWTError as exc:
        raise HTTPException(status_code=401, detail="Invalid token") from exc
    user = store.get_user(payload["sub"])
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user


@router.post("/login")
async def login(payload: LoginRequest):
    user = store.find_user_by_email(payload.email)
    if not user or user.password != payload.password:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    token = create_token(user.id, user.role)
    return {"token": token}


@router.post("/register")
async def register(payload: RegisterRequest):
    if store.find_user_by_email(payload.email):
        raise HTTPException(status_code=400, detail="Email already exists")
    user = store.create_user(payload.email, payload.password, payload.fullName, "user")
    token = create_token(user.id, user.role)
    return {"token": token}


@router.get("/me")
async def me(current_user=Depends(get_current_user)):
    return {
        "id": current_user.id,
        "email": current_user.email,
        "fullName": current_user.full_name,
        "role": current_user.role,
    }
