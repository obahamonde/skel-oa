from __future__ import annotations

from os import environ
from typing import Any, Literal, TypeAlias, TypeVar, Union
from uuid import uuid4

from openai import AsyncOpenAI
from pydantic import BaseModel, Field  # pylint: disable=E0611

from .client import APIClient
from .decorators import robust

T = TypeVar("T")
Value: TypeAlias = Union[str, int, float, bool, list[str]]
Filter: TypeAlias = Literal["$eq", "$ne", "$lt", "$lte", "$gt", "$gte", "$in", "$nin"]
AndOr: TypeAlias = Literal["$and", "$or"]
Query: TypeAlias = Union[
    dict[str, Union[Value, "Query", list["Query"], list[Value]]],
    dict[Filter, Value],
    dict[AndOr, list["Query"]],
]
Vector: TypeAlias = list[float]
MetaData: TypeAlias = dict[str, Value]


class QueryBuilder:
    """Query builder for Pinecone Query API with MongoDB-like syntax."""

    def __init__(self, field: str = None, query: Query = None):  # type: ignore
        self.field = field
        self.query = query if query else {}

    def __repr__(self) -> str:
        return f"{self.query}"

    def __call__(self, field_name: str) -> QueryBuilder:
        return QueryBuilder(field_name)

    def __and__(self, other: QueryBuilder) -> QueryBuilder:
        return QueryBuilder(query={"$and": [self.query, other.query]})

    def __or__(self, other: QueryBuilder) -> QueryBuilder:
        return QueryBuilder(query={"$or": [self.query, other.query]})

    def __eq__(self, value: Value) -> QueryBuilder:  # type: ignore
        return QueryBuilder(query={self.field: {"$eq": value}})

    def __ne__(self, value: Value) -> QueryBuilder:  # type: ignore
        return QueryBuilder(query={self.field: {"$ne": value}})

    def __lt__(self, value: Value) -> QueryBuilder:
        return QueryBuilder(query={self.field: {"$lt": value}})

    def __le__(self, value: Value) -> QueryBuilder:
        return QueryBuilder(query={self.field: {"$lte": value}})

    def __gt__(self, value: Value) -> QueryBuilder:
        return QueryBuilder(query={self.field: {"$gt": value}})

    def __ge__(self, value: Value) -> QueryBuilder:
        return QueryBuilder(query={self.field: {"$gte": value}})

    def in_(self, values: list[Value]) -> QueryBuilder:
        """MongoDB-like syntax for $in operator."""
        return QueryBuilder(query={self.field: {"$in": values}})

    def nin_(self, values: list[Value]) -> QueryBuilder:
        """MongoDB-like syntax for $nin operator."""
        return QueryBuilder(query={self.field: {"$nin": values}})


class UpsertRequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid4()))
    values: Vector = Field(...)
    metadata: MetaData = Field(...)


class Embedding(BaseModel):
    values: Vector = Field(...)
    metadata: MetaData = Field(...)


class QueryRequest(BaseModel):
    topK: int = Field(default=10)
    filter: dict[str, Any] = Field(...)
    includeMetadata: bool = Field(default=True)
    vector: Vector = Field(...)


class QueryMatch(BaseModel):
    id: str = Field(...)
    score: float = Field(...)
    metadata: MetaData = Field(...)


class QueryResponse(BaseModel):
    matches: list[QueryMatch] = Field(...)


class UpsertResponse(BaseModel):
    upsertedCount: int = Field(...)


class QueryResponseItem(BaseModel):
    text: str = Field(...)
    score: float = Field(...)


class Retriever(APIClient):
    base_url: str = Field(
        default=environ.get("PINECONE_API_URL", "https://api.pinecone.io")
    )
    headers: dict[str, str] = Field(
        default_factory=lambda: {"api-key": environ.get("PINECONE_API_KEY")}
    )

    @property
    def builder(self):
        return QueryBuilder()

    @property
    def _ai(self):
        return AsyncOpenAI()

    @property
    def encoder(self):
        return self._ai.embeddings

    @robust
    async def upsert(
        self, vectors: list[Vector], metadata: list[MetaData]
    ) -> UpsertResponse:
        payload = {
            "vectors": [
                UpsertRequest(values=vector, metadata=meta).dict()
                for vector, meta in zip(vectors, metadata)
            ]
        }
        response = await self.post(url="/vectors/upsert", json=payload)
        return UpsertResponse(**response)

    @robust
    async def query(
        self, expr: Query, vector: Vector, includeMetadata: bool = True, topK: int = 5
    ):
        payload = QueryRequest(
            filter=expr, vector=vector, includeMetadata=includeMetadata, topK=topK  # type: ignore
        ).dict()
        response = await self.post(url="/query", json=payload)
        return [match for match in QueryResponse(**response).matches]

    @robust
    async def encode(self, text: str | list[str]) -> list[Vector] | Vector:
        response = await self.encoder.create(input=text, model="text-embedding-ada-002")
        return (
            [r.embedding for r in response.data]
            if len(response.data) > 1
            else response.data[0].embedding
        )
