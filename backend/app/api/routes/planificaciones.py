from fastapi import APIRouter, HTTPException, status, Depends
from typing import List
from bson.objectid import ObjectId
from datetime import datetime
from app.models.planificacion import PlanificacionCreate, PlanificacionResponse, PlanificacionUpdate
from app.utils.auth import get_current_user
from app.db import get_database

router = APIRouter(prefix="/api/planificaciones", tags=["planificaciones"])

@router.post("", response_model=PlanificacionResponse)
async def create_planificacion(
    planificacion: PlanificacionCreate,
    email: str = Depends(get_current_user)
):
    db = get_database()

    # Obtener ID del usuario
    user = db.users.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    # Crear documento
    doc = {
        "user_id": str(user["_id"]),
        "tipo_material": planificacion.tipo_material,
        "idea_inicial": planificacion.idea_inicial,
        "titulo": planificacion.titulo or "",
        "contenido": planificacion.contenido or {},
        "chat_history": [],
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }

    result = db.planificaciones.insert_one(doc)

    return {
        "id": str(result.inserted_id),
        **doc,
        "user_id": None  # No enviar ID de usuario al cliente
    }

@router.get("", response_model=List[PlanificacionResponse])
async def list_planificaciones(email: str = Depends(get_current_user)):
    db = get_database()

    # Obtener ID del usuario
    user = db.users.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    # Obtener planificaciones del usuario
    planificaciones = list(db.planificaciones.find({"user_id": str(user["_id"])}))

    return [
        {
            "id": str(p["_id"]),
            "tipo_material": p.get("tipo_material"),
            "idea_inicial": p.get("idea_inicial"),
            "titulo": p.get("titulo"),
            "contenido": p.get("contenido", {}),
            "chat_history": p.get("chat_history", []),
            "created_at": p.get("created_at"),
            "updated_at": p.get("updated_at"),
        }
        for p in planificaciones
    ]

@router.get("/{plan_id}", response_model=PlanificacionResponse)
async def get_planificacion(plan_id: str, email: str = Depends(get_current_user)):
    db = get_database()

    # Obtener ID del usuario
    user = db.users.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    # Obtener planificación
    try:
        plan = db.planificaciones.find_one({
            "_id": ObjectId(plan_id),
            "user_id": str(user["_id"])
        })
    except:
        raise HTTPException(status_code=400, detail="ID inválido")

    if not plan:
        raise HTTPException(status_code=404, detail="Planificación no encontrada")

    return {
        "id": str(plan["_id"]),
        "tipo_material": plan.get("tipo_material"),
        "idea_inicial": plan.get("idea_inicial"),
        "titulo": plan.get("titulo"),
        "contenido": plan.get("contenido", {}),
        "chat_history": plan.get("chat_history", []),
        "created_at": plan.get("created_at"),
        "updated_at": plan.get("updated_at"),
    }

@router.put("/{plan_id}", response_model=PlanificacionResponse)
async def update_planificacion(
    plan_id: str,
    update: PlanificacionUpdate,
    email: str = Depends(get_current_user)
):
    db = get_database()

    # Obtener ID del usuario
    user = db.users.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    # Actualizar planificación
    try:
        result = db.planificaciones.find_one_and_update(
            {
                "_id": ObjectId(plan_id),
                "user_id": str(user["_id"])
            },
            {
                "$set": {
                    "titulo": update.titulo,
                    "contenido": update.contenido or {},
                    "chat_history": update.chat_history or [],
                    "updated_at": datetime.utcnow(),
                }
            },
            return_document=True
        )
    except:
        raise HTTPException(status_code=400, detail="ID inválido")

    if not result:
        raise HTTPException(status_code=404, detail="Planificación no encontrada")

    return {
        "id": str(result["_id"]),
        "tipo_material": result.get("tipo_material"),
        "idea_inicial": result.get("idea_inicial"),
        "titulo": result.get("titulo"),
        "contenido": result.get("contenido", {}),
        "chat_history": result.get("chat_history", []),
        "created_at": result.get("created_at"),
        "updated_at": result.get("updated_at"),
    }

@router.delete("/{plan_id}")
async def delete_planificacion(plan_id: str, email: str = Depends(get_current_user)):
    db = get_database()

    # Obtener ID del usuario
    user = db.users.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    # Eliminar planificación
    try:
        result = db.planificaciones.delete_one({
            "_id": ObjectId(plan_id),
            "user_id": str(user["_id"])
        })
    except:
        raise HTTPException(status_code=400, detail="ID inválido")

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Planificación no encontrada")

    return {"message": "Planificación eliminada"}
