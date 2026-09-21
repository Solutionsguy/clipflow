import os
from fastapi import APIRouter, Request, Depends, HTTPException
from fastapi.responses import RedirectResponse
from auth import create_access_token, get_db, datetime, timedelta

router = APIRouter(prefix="/api/auth/oauth", tags=["oauth"])

@router.get("/google")
async def login_google():
    # In a real app, use authlib. Here we simulate a successful OAuth return.
    # We will just redirect to a callback.
    return RedirectResponse(url="/api/auth/oauth/google/callback")

@router.get("/google/callback")
async def google_callback():
    # Simulate finding/creating a user
    email = "googleuser@example.com"
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(data={"sub": email}, expires_delta=access_token_expires)
    response = RedirectResponse(url="/")
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        max_age=1800,
        expires=1800,
        samesite="lax",
        secure=False,
    )
    return response

@router.get("/github")
async def login_github():
    return RedirectResponse(url="/api/auth/oauth/github/callback")

@router.get("/github/callback")
async def github_callback():
    email = "githubuser@example.com"
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(data={"sub": email}, expires_delta=access_token_expires)
    response = RedirectResponse(url="/")
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        max_age=1800,
        expires=1800,
        samesite="lax",
        secure=False,
    )
    return response
