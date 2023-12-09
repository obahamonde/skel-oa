from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

from .routes import router as api_router


def create_app():
    app = FastAPI(title="FastAPI OpenAI Google APIs", version="0.1.0")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.include_router(api_router)

    @app.get("/api", tags=["healthcheck"])
    async def _():
        return {"status": "ok"}

    @app.get("/", tags=["root"])
    async def _():
        return RedirectResponse(url="/docs")

    return app


__all__ = ["create_app"]
