from fastapi import APIRouter

from ..components.schemas import ThreadResource

app = APIRouter(prefix="/threads", tags=["threads"])


@app.post("/")
async def create_thread(thread: ThreadResource):
    return await thread.post()


@app.get("/{thread_id}")
async def retrieve_thread(thread_id: str):
    return await ThreadResource.get(thread_id=thread_id)


@app.delete("/{thread_id}")
async def delete_thread(thread_id: str):
    return await ThreadResource.delete(thread_id=thread_id)
