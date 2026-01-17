from pydantic import BaseModel
import os


def _split_env(value: str | None) -> list[str]:
    if not value:
        return ["http://localhost:5173"]
    return [item.strip() for item in value.split(",") if item.strip()]


class Settings(BaseModel):
    postgres_url: str = os.getenv(
        "POSTGRES_URL", "postgresql+asyncpg://techshop:techshop@postgres:5432/techshop"
    )
    mongo_url: str = os.getenv("MONGO_URL", "mongodb://mongo:27017/techshop")
    jwt_secret: str = os.getenv("JWT_SECRET", "dev-secret")
    cors_origins: list[str] = _split_env(os.getenv("CORS_ORIGINS"))


settings = Settings()
