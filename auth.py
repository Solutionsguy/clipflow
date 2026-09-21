import os
import sqlite3
from datetime import datetime, timedelta
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext

from fastapi_csrf_protect import CsrfProtect
from slowapi import Limiter
from slowapi.util import get_remote_address
limiter = Limiter(key_func=get_remote_address)


# Configuration – read from env or defaults
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "super-secret-key-change-me")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("JWT_ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
REMEMBER_ME_DAYS = int(os.getenv("JWT_REMEMBER_ME_DAYS", "30"))

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter(prefix="/api/auth", tags=["auth"])

def get_db():
    db_path = os.getenv("DATABASE_PATH") or os.path.join(os.path.dirname(__file__), "users.db")
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cur = conn.cursor()
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            full_name TEXT,
            hashed_password TEXT NOT NULL,
            is_active INTEGER NOT NULL DEFAULT 1,
            created_at TEXT NOT NULL
        )
        """
    )
    conn.commit()
    conn.close()

init_db()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def get_user_by_email(email: str) -> Optional[sqlite3.Row]:
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE email = ?", (email,))
    user = cur.fetchone()
    conn.close()
    return user

def create_user(email: str, password: str, full_name: Optional[str] = None) -> sqlite3.Row:
    hashed_password = get_password_hash(password)
    conn = get_db()
    cur = conn.cursor()
    try:
        cur.execute(
            "INSERT INTO users (email, full_name, hashed_password, created_at) VALUES (?, ?, ?, ?)",
            (email, full_name, hashed_password, datetime.utcnow().isoformat()),
        )
        conn.commit()
        user_id = cur.lastrowid
    except sqlite3.IntegrityError:
        conn.close()
        raise HTTPException(status_code=400, detail="Email already registered")
    cur.execute("SELECT * FROM users WHERE id = ?", (user_id,))
    user = cur.fetchone()
    conn.close()
    return user

def authenticate_user(email: str, password: str) -> Optional[sqlite3.Row]:
    user = get_user_by_email(email)
    if not user:
        return None
    if not verify_password(password, user["hashed_password"]):
        return None
    if not user["is_active"]:
        return None
    return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

async def get_current_user(request: Request, token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = get_user_by_email(email)
    if user is None:
        raise credentials_exception
    return user

@router.post("/signup")
async def signup(email: str, password: str, full_name: Optional[str] = None):
    if len(password) < 8:
        raise HTTPException(status_code=400, detail="Password must be at least 8 characters")
    user = create_user(email=email, password=password, full_name=full_name)
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user["email"]}, expires_delta=access_token_expires)
    # Set httpOnly cookie (session) – 30‑day remember‑me handled on login side
    response = {"msg": "User created"}
    return {
        "access_token": access_token,
        "token_type": "bearer",
        **response,
    }

@router.post("/login")
@limiter.limit("5/minute")
async def login(request: Request, email: str, password: str, remember_me: bool = False, csrf_protect: CsrfProtect = Depends()):
    csrf_protect.validate_csrf(request)
    user = authenticate_user(email, password)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    if remember_me:
        expires = timedelta(days=REMEMBER_ME_DAYS)
    else:
        expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user["email"]}, expires_delta=expires)
    # Return token in httpOnly cookie
    from fastapi.responses import JSONResponse
    response = JSONResponse(content={"msg": "Login successful"})
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        max_age=int(expires.total_seconds()),
        expires=int(expires.total_seconds()),
        samesite="lax",
        secure=False,  # set True in production behind HTTPS
    )
    return response

@router.post("/logout")
async def logout(request: Request, csrf_protect: CsrfProtect = Depends()):
    csrf_protect.validate_csrf(request)
    from fastapi.responses import JSONResponse
    response = JSONResponse(content={"msg": "Logged out"})
    response.delete_cookie(key="access_token")
    return response

@router.get("/me")
async def read_me(current_user: sqlite3.Row = Depends(get_current_user)):
    return {
        "email": current_user["email"],
        "full_name": current_user["full_name"],
        "created_at": current_user["created_at"],
    }
