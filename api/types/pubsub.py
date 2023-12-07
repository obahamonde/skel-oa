import asyncio
from typing import AsyncGenerator, Dict, Generic, List, TypeVar

from fastapi import APIRouter
from pydantic import BaseModel

T = TypeVar("T", bound=BaseModel)


class Event(BaseModel, Generic[T]):
    event: str
    data: T


class PubSubQueue(APIRouter, Generic[T]):
    subscribers: Dict[str, List[asyncio.Queue[Event[T]]]] = {}

    async def sub(self, *, key: str):
        queue = asyncio.Queue[Event[T]]()
        key = key.lower()
        if key in self.subscribers:
            self.subscribers[key].append(queue)
        else:
            self.subscribers[key] = [queue]

        async def generator() -> AsyncGenerator[Event[T], None]:
            while True:
                message = await queue.get()
                yield message
                if message.event == "done":
                    break

        return generator()

    async def pub(self, *, key: str, event: str, message: T):
        key = key.lower()
        if key in self.subscribers:
            for queue in self.subscribers[key]:
                await queue.put(Event(event=event, data=message))
        else:
            self.subscribers[key] = []
