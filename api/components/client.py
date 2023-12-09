from abc import ABC, abstractmethod
from typing import (
    Any,
    Dict,
    Generic,
    Iterable,
    List,
    Literal,
    Optional,
    TypeVar,
    Union,
    cast,
    AsyncIterator
)

from fastapi import HTTPException
from httpx import AsyncClient
from pydantic import BaseModel  # pylint: disable=E0611

T = TypeVar("T")
Method = Literal["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS", "TRACE"]
Json = Union[Dict[str, Any], List[Any], str, int, float, bool, None]
Scalar = Union[str, int, float, bool, None]


class LazyProxy(Generic[T], ABC):
    def __init__(self) -> None:
        self.__proxied: T | None = None

    def __getattr__(self, attr: str) -> object:
        return getattr(self.__get_proxied__(), attr)

    def __repr__(self) -> str:
        return repr(self.__get_proxied__())

    def __str__(self) -> str:
        return str(self.__get_proxied__())

    def __dir__(self) -> Iterable[str]:
        return self.__get_proxied__().__dir__()

    def __get_proxied__(self) -> T:
        proxied = self.__proxied
        if proxied is not None:
            return proxied

        self.__proxied = proxied = self.__load__()
        return proxied

    def __set_proxied__(self, value: T) -> None:
        self.__proxied = value

    def __as_proxied__(self) -> T:
        """Helper method that returns the current proxy, typed as the loaded object"""
        return cast(T, self)

    @abstractmethod
    def __load__(self) -> T:
        ...


class APIClient(BaseModel, LazyProxy[AsyncClient]):
    """
    Generic Lazy Loading APIClient
    """

    base_url: str
    headers: Dict[str, str]

    def __init__(self, *args: Any, **kwargs: Any):
        super().__init__(*args, **kwargs)
        self.__load__()

    def __load__(self):
        return AsyncClient(base_url=self.base_url, headers=self.headers)

    def dict(self, *args: Any, **kwargs: Any):
        return super().dict(*args, exclude={"headers"}, **kwargs)

    async def fetch(
        self,
        *,
        method: Method,
        url: str,
        params: Optional[Dict[str, Scalar]] = None,
        json: Optional[Json] = None,
        headers: Optional[Dict[str, str]] = None,
    ):
        if method in ("GET", "DELETE", "HEAD", "OPTIONS", "TRACE"):
            if headers is not None:
                self.headers.update(headers)
                headers = self.headers
            else:
                headers = self.headers
            response = await self.__load__().request(
                method=method, url=url, headers=headers, params=params
            )
        else:
            if headers is not None:
                self.headers.update(headers)
                headers = self.headers
            else:
                headers = self.headers
            response = await self.__load__().request(
                method=method, url=url, headers=headers, json=json
            )
        if response.status_code >= 400:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        return response

    async def get(
        self,
        *,
        url: str,
        params: Optional[Dict[str, Scalar]] = None,
        headers: Optional[Dict[str, str]] = None,
    ):
        response = await self.fetch(
            method="GET", url=url, headers=headers, params=params
        )
        return response.json()

    async def post(
        self,
        *,
        url: str,
        params: Optional[Dict[str, Scalar]] = None,
        json: Optional[Json] = None,
        headers: Optional[Dict[str, str]] = None,
    ):
        response = await self.fetch(
            method="POST", url=url, json=json, headers=headers, params=params
        )
        return response.json()

    async def put(
        self,
        *,
        url: str,
        json: Optional[Json] = None,
        params: Optional[Dict[str, Scalar]] = None,
        headers: Optional[Dict[str, str]] = None,
    ):
        response = await self.fetch(
            method="PUT", url=url, json=json, headers=headers, params=params
        )
        return response.json()

    async def delete(
        self,
        *,
        url: str,
        params: Optional[Dict[str, Scalar]] = None,
        headers: Optional[Dict[str, str]] = None,
    ):
        response = await self.fetch(
            method="DELETE", url=url, headers=headers, params=params
        )
        return response.json()

    async def patch(
        self,
        *,
        url: str,
        params: Optional[Dict[str, Scalar]] = None,
        json: Optional[Json] = None,
        headers: Optional[Dict[str, str]] = None,
    ):
        response = await self.fetch(
            method="PATCH", url=url, json=json, headers=headers, params=params
        )
        return response.json()

    async def head(
        self,
        *,
        url: str,
        params: Optional[Dict[str, Scalar]] = None,
        headers: Optional[Dict[str, str]] = None,
    ):
        response = await self.fetch(
            method="HEAD", url=url, headers=headers, params=params
        )
        return response.json()

    async def options(
        self,
        *,
        url: str,
        headers: Optional[Dict[str, str]] = None,
    ):
        response = await self.fetch(method="OPTIONS", url=url, headers=headers)
        return response.json()

    async def trace(
        self,
        *,
        url: str,
        params: Optional[Dict[str, Scalar]] = None,
        headers: Optional[Dict[str, str]] = None,
    ):
        response = await self.fetch(
            method="TRACE", url=url, headers=headers, params=params
        )
        return response.json()

    async def text(
        self,
        *,
        url: str,
        method: Method = "GET",
        params: Optional[Dict[str, Scalar]] = None,
        json: Optional[Json] = None,
        headers: Optional[Dict[str, str]] = None,
    ):
        response = await self.fetch(
            method=method, url=url, json=json, headers=headers, params=params
        )
        return response.text

    async def blob(
        self,
        *,
        url: str,
        params: Optional[Dict[str, Scalar]] = None,
        method: Method = "GET",
        json: Optional[Json] = None,
        headers: Optional[Dict[str, str]] = None,
    ):
        response = await self.fetch(
            method=method, url=url, json=json, params=params, headers=headers
        )
        return response.content

    async def stream(
        self,
        *,
        url: str,
        method: Method,
        params: Optional[Dict[str, Scalar]] = None,
        json: Optional[Json] = None,
        headers: Optional[Dict[str, str]] = None,
    ) -> AsyncIterator[bytes]:
        if headers is not None:
            self.headers.update(headers)
            headers = self.headers
        else:
            headers = self.headers
        response = await self.fetch(
            method=method, url=url, json=json, params=params, headers=headers
        )
        async for chunk in response.aiter_bytes():
            yield chunk
