from fastapi import APIRouter

from ..types.typedefs import ThreadMessageResource

app = APIRouter(prefix="/messages", tags=["messages"])


@app.post("/")
async def create_message(message: ThreadMessageResource):
    return await message.post()


@app.get("/{thread_id}")
async def retrieve_message(message_id: str, thread_id: str):
    return await ThreadMessageResource.get(message_id=message_id, thread_id=thread_id)


@app.get("/")
async def retrieve_messages(thread_id: str):
    return await ThreadMessageResource.list(thread_id=thread_id)
