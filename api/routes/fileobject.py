from fastapi import APIRouter, File, UploadFile

from ..components.schemas import FileResource

app = APIRouter(prefix="/files", tags=["files"])


@app.post("/")
async def create_file(file: UploadFile = File(...)):
    return await FileResource(file=file.file.read()).post()


@app.get("/{file_id}")
async def retrieve_file(file_id: str):
    return await FileResource.get(file_id=file_id)


@app.delete("/{file_id}")
async def delete_file(file_id: str):
    return await FileResource.delete(file_id=file_id)
