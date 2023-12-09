from abc import ABC, abstractmethod
from typing import Any, Generic, TypeVar

from openai.types.chat.completion_create_params import Function
from pydantic import BaseModel  # pylint: disable=E0611

from .decorators import robust, setup_logging

T = TypeVar("T", bound=BaseModel)

logger = setup_logging()


class OpenAIFunctionCall(BaseModel, Generic[T]):
    function: str
    data: T


class OpenAIFunction(BaseModel, Generic[T], ABC):
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

    @property
    def name(self) -> str:
        return self.__class__.__name__.lower()

    @abstractmethod
    async def run(self) -> T:
        raise NotImplementedError

    @robust
    async def __call__(self) -> OpenAIFunctionCall[T]:
        logger.info("Calling %s", self.__class__.__name__.lower())
        response = await self.run()
        return OpenAIFunctionCall(function=self.name, data=response)

    @property
    @abstractmethod
    def tool_(self) -> Any:
        raise NotImplementedError
