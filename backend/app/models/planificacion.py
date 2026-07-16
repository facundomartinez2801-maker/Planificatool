from pydantic import BaseModel
from typing import Optional, List, Any
from datetime import datetime

class MessageModel(BaseModel):
    id: int
    sender: str
    type: str
    text: str
    summary: Optional[str] = None
    suggestionData: Optional[dict] = None
    suggestionAccepted: Optional[bool] = None

class PlanificacionBase(BaseModel):
    tipo_material: str
    idea_inicial: str
    titulo: Optional[str] = ""
    contenido: Optional[dict] = {}

class PlanificacionCreate(PlanificacionBase):
    pass

class PlanificacionUpdate(BaseModel):
    titulo: Optional[str] = None
    contenido: Optional[dict] = None
    chat_history: Optional[List[MessageModel]] = None

class PlanificacionResponse(PlanificacionBase):
    id: Optional[str] = None
    user_id: Optional[str] = None
    chat_history: Optional[List[MessageModel]] = []
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class PlanificacionDB(PlanificacionBase):
    user_id: str
    chat_history: List[dict] = []
    created_at: datetime = datetime.utcnow()
    updated_at: datetime = datetime.utcnow()

    class Config:
        from_attributes = True
