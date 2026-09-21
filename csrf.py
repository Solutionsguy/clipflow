from fastapi import Request
from fastapi_csrf_protect import CsrfProtect
from pydantic import BaseModel

class CsrfSettings(BaseModel):
    secret_key: str = "super-secret-csrf-key"
    cookie_samesite: str = "lax"
    cookie_secure: bool = False

@CsrfProtect.load_config
def get_csrf_config():
    return CsrfSettings()
