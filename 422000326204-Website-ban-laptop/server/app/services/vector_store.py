from __future__ import annotations

import math
from dataclasses import dataclass
from typing import Iterable, List


@dataclass
class Document:
    id: str
    text: str


class SimpleVectorStore:
    def __init__(self) -> None:
        self._docs: List[Document] = []

    def add_documents(self, docs: Iterable[Document]) -> None:
        self._docs.extend(docs)

    def _embed(self, text: str) -> dict[str, float]:
        words = [w.lower() for w in text.split() if w.strip()]
        counts: dict[str, float] = {}
        for word in words:
            counts[word] = counts.get(word, 0.0) + 1.0
        return counts

    def _cosine(self, left: dict[str, float], right: dict[str, float]) -> float:
        dot = sum(left.get(k, 0.0) * v for k, v in right.items())
        left_norm = math.sqrt(sum(v * v for v in left.values()))
        right_norm = math.sqrt(sum(v * v for v in right.values()))
        if left_norm == 0 or right_norm == 0:
            return 0.0
        return dot / (left_norm * right_norm)

    def search(self, query: str, limit: int = 3) -> List[Document]:
        query_vec = self._embed(query)
        scored = [
            (self._cosine(query_vec, self._embed(doc.text)), doc)
            for doc in self._docs
        ]
        scored.sort(key=lambda item: item[0], reverse=True)
        return [doc for score, doc in scored[:limit] if score > 0]
