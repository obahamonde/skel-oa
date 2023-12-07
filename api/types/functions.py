from abc import ABC, abstractmethod
from typing import Any, TypeVar

from openai.types.chat.completion_create_params import Function
from pydantic import BaseModel  # pylint: disable=E0611

from .decorators import handle, setup_logging

T = TypeVar("T", bound=BaseModel)

logger = setup_logging()


class OpenAIFunction(BaseModel, ABC):
    @classmethod
    def definition(cls) -> Function:
        assert cls.__doc__ is not None, "OpenAIFunction must have a docstring"
        _schema = cls.schema()  # type: ignore
        _name = cls.__name__
        _description = cls.__doc__
        _parameters = {
            "type": "object",
            "properties": {
                k: v for k, v in _schema["properties"].items() if k != "self"
            },
            "required": _schema.get("required", []),
        }
        return Function(name=_name, description=_description, parameters=_parameters)  # type: ignore

    @abstractmethod
    async def run(self) -> Any:
        raise NotImplementedError

    @property
    @abstractmethod
    def tool_(self) -> Any:
        raise NotImplementedError

    @handle
    async def __call__(self):
        logger.info("Calling %s", self.__class__.__name__.lower())
        return await self.run()
