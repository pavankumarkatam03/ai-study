from fastapi import APIRouter, HTTPException, status,Query
from pydantic import BaseModel
from core.utils import hash_password, verify_password, create_access_token
from core.database import get_user_by_username, add_user

from services.stt_service import handle_speak

router = APIRouter()

class LoginRequest(BaseModel):
    username: str
    password: str 

class RegisterRequest(BaseModel):
    name:str
    username: str
    email: str
    password: str

class AuthResponse(BaseModel):
    message: str
    token: str = None

class SpeakRequest(BaseModel):
    language: str
    language2: str# Add this

@router.post("/register", response_model=AuthResponse)
def register_user(user: RegisterRequest):
    print("Received data:", user.dict())
    existing_user = get_user_by_username(user.username)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already exists"
        )
    
    hashed_password = hash_password(user.password)
    add_user(user.name, user.username, user.email, hashed_password)
    
    return {"message": "Account registered successfully"}

@router.post("/login", response_model=AuthResponse)
def login_user(user: LoginRequest):
    db_user = get_user_by_username(user.username)
    if not db_user or not verify_password(user.password, db_user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    access_token = create_access_token(data={"sub": user.username})
    return {
        "message": "Login successfully",
        "token": access_token
    }

@router.get("/home")
def home_page():
    return {"message": "Welcome to AI Study Buddy APP"}

@router.post("/speak")
def speak(request: SpeakRequest):
    return handle_speak(request.language, request.language2)