from fastapi import APIRouter

from .assistant import app as assistant_app
from .fileobject import app as fileobject_app
from .messages import app as messages_app
from .run import app as run_app
from .thread import app as thread_app

router = APIRouter(prefix="/api")

router.include_router(assistant_app)
router.include_router(messages_app)
router.include_router(run_app)
router.include_router(thread_app)
router.include_router(fileobject_app)

__all__ = ["router"]
