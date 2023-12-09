import asyncio
from typing import AsyncGenerator, Generic, TypeVar

from pydantic import BaseModel  # pylint: disable=E0611

T = TypeVar("T", bound=BaseModel)


class Event(BaseModel, Generic[T]):
    event: str
    data: T


class PubSubQueue(Generic[T]):
    subscribers: dict[str, dict[str, asyncio.Queue[Event[T]]]] = {}

    async def sub(self, *, key: str, id: str) -> AsyncGenerator[Event[T], None]:
        self._prepare(key=key, id=id)
        while True:
            yield await self.subscribers[key][id].get()

    async def pub(self, *, key: str, id: str, event: Event[T]) -> None:
        self._prepare(key=key, id=id)
        await self.subscribers[key][id].put(event)

    def _prepare(self, *, key: str, id: str) -> None:
        if key not in self.subscribers:
            self.subscribers[key] = {}
        if id not in self.subscribers[key]:
            self.subscribers[key][id] = asyncio.Queue[Event[T]]()
