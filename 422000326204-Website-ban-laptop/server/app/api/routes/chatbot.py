from fastapi import APIRouter
from pydantic import BaseModel

from app.services.chatbot import chat_engine

router = APIRouter()


class TrainRequest(BaseModel):
    texts: list[str]


class AskRequest(BaseModel):
    question: str


@router.post("/train")
async def train(payload: TrainRequest):
    return await chat_engine.train(payload.texts)


@router.post("/ask")
async def ask(payload: AskRequest):
    return await chat_engine.ask(payload.question)
