import pytest
from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_signup():
    response = client.post("/api/auth/signup?email=test@example.com&password=password123&full_name=Test%20User")
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["msg"] == "User created"

def test_login():
    # Login
    response = client.post("/api/auth/login?email=test@example.com&password=password123")
    assert response.status_code == 200
    assert "access_token" in response.cookies

def test_read_me():
    # Need to login first to get the cookie
    login_resp = client.post("/api/auth/login?email=test@example.com&password=password123")
    
    # Read me
    response = client.get("/api/auth/me", cookies=login_resp.cookies)
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "test@example.com"
    assert data["full_name"] == "Test User"

def test_logout():
    login_resp = client.post("/api/auth/login?email=test@example.com&password=password123")
    response = client.post("/api/auth/logout", cookies=login_resp.cookies)
    assert response.status_code == 200
    # Wait, the logout should clear the cookie
    assert response.cookies.get("access_token") is None or response.cookies.get("access_token") == '""'
