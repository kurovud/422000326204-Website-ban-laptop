from __future__ import annotations

import os
import uuid
from typing import List

from app.services.vector_store import Document, SimpleVectorStore


class ChatEngine:
    def __init__(self) -> None:
        self._store = SimpleVectorStore()
        self._system_prompt = (
            "Bạn là trợ lý bán hàng TechShop. Hãy trả lời ngắn gọn, đúng trọng tâm, "
            "ưu tiên thông tin trong dữ liệu tham chiếu nếu có."
        )

    async def train(self, texts: List[str]) -> dict:
        docs = [Document(id=str(uuid.uuid4()), text=text) for text in texts]
        self._store.add_documents(docs)
        return {"ingested": len(docs)}

    async def ask(self, question: str) -> dict:
        references = self._store.search(question)
        context = "\n".join([doc.text for doc in references])
        response = self._generate_response(question, context)
        return {"answer": response, "sources": [doc.id for doc in references]}

    def _generate_response(self, question: str, context: str) -> str:
        if context:
            return (
                f"{self._system_prompt}\n\nThông tin tham chiếu:\n{context}\n\n"
                f"Câu hỏi: {question}\nTrả lời: Dựa trên dữ liệu hiện có, hãy xem thông tin trên để tư vấn."
            )
        if os.getenv("LLM_PROVIDER"):
            return (
                f"{self._system_prompt}\n\nCâu hỏi: {question}\n"
                "Trả lời: (Cấu hình LLM_PROVIDER để gọi GPT/LLaMA và sinh trả lời thực.)"
            )
        return (
            f"{self._system_prompt}\n\nCâu hỏi: {question}\n"
            "Trả lời: Hiện chưa có dữ liệu tham chiếu, hãy nạp dữ liệu trước khi hỏi."
        )


chat_engine = ChatEngine()
