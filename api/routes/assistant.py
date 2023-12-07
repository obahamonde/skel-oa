from fastapi import APIRouter

from ..types.typedefs import AssistantResource

app = APIRouter(prefix="/assistants", tags=["assistants"])


@app.post("/")
async def create_assistant(assistant: AssistantResource):
    return await assistant.post()


@app.get("/{assistant_id}")
async def retrieve_assistant(assistant_id: str):
    return await AssistantResource.get(assistant_id=assistant_id)


@app.delete("/{assistant_id}")
async def delete_assistant(assistant_id: str):
    return await AssistantResource.delete(assistant_id=assistant_id)


@app.put("/{assistant_id}")
async def update_assistant(assistant_id: str, assistant: AssistantResource):
    return await assistant.put(assistant_id=assistant_id)
