from fastapi import APIRouter, HTTPException, status, Depends
from pymongo.errors import DuplicateKeyError
from app.models.user import UserCreate, UserLogin, Token, UserResponse
from app.utils.auth import get_password_hash, verify_password, create_access_token, get_current_user
from app.db import get_database
from bson.objectid import ObjectId
from datetime import timedelta

router = APIRouter(prefix="/auth", tags=["authentication"])

@router.post("/register", response_model=Token)
async def register(user: UserCreate):
    db = get_database()

    # Verificar si el usuario ya existe
    existing_user = db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El email ya está registrado"
        )

    # Crear nuevo usuario
    hashed_password = get_password_hash(user.password)
    user_doc = {
        "email": user.email,
        "nombre": user.nombre,
        "password": hashed_password,
    }

    result = db.users.insert_one(user_doc)

    # Crear token
    access_token = create_access_token(data={"sub": user.email})

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": str(result.inserted_id),
            "email": user.email,
            "nombre": user.nombre
        }
    }

@router.post("/login", response_model=Token)
async def login(user: UserLogin):
    db = get_database()

    # Buscar usuario
    user_doc = db.users.find_one({"email": user.email})
    if not user_doc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email o contraseña incorrectos"
        )

    # Verificar contraseña
    if not verify_password(user.password, user_doc["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email o contraseña incorrectos"
        )

    # Crear token
    access_token = create_access_token(data={"sub": user.email})

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": str(user_doc["_id"]),
            "email": user_doc["email"],
            "nombre": user_doc["nombre"]
        }
    }

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(email: str = Depends(get_current_user)):
    db = get_database()
    user = db.users.find_one({"email": email})

    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    return {
        "id": str(user["_id"]),
        "email": user["email"],
        "nombre": user["nombre"]
    }
