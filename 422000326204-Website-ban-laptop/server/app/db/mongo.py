from motor.motor_asyncio import AsyncIOMotorClient

from app.core.config import settings

client = AsyncIOMotorClient(settings.mongo_url)


def get_mongo_db():
    return client.get_default_database()
