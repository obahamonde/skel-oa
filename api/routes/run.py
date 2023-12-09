from fastapi import APIRouter

from ..components.schemas import RunResource

app = APIRouter(prefix="/runs", tags=["runs"])


@app.post("/")
async def create_run(run: RunResource):
    return await run.post()


@app.get("/{run_id}")
async def retrieve_run(run_id: str, thread_id: str):
    return await RunResource.get(run_id=run_id, thread_id=thread_id)


@app.delete("/{run_id}")
async def delete_run(run_id: str, thread_id: str):
    return await RunResource.delete(run_id=run_id, thread_id=thread_id)


@app.get("/")
async def retrieve_run_steps(run_id: str, thread_id: str):
    return await RunResource.list(run_id=run_id, thread_id=thread_id)
