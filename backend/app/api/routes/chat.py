from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from app.utils.auth import get_current_user
from app.services.ia_service import ia_service
from app.db import get_database
from bson.objectid import ObjectId

router = APIRouter(prefix="/api", tags=["chat"])

class AnalyzeInitialRequest(BaseModel):
    initial_idea: str
    material_type: str

class ChatMessage(BaseModel):
    message: str
    history: List[dict] = []
    extracted_info: Optional[Dict[str, Any]] = None
    material_type: Optional[str] = None
    context: Optional[dict] = None

class ChatResponse(BaseModel):
    message: str
    summary: str
    interview_complete: Optional[bool] = False
    usage: Optional[dict] = None

@router.post("/chat/analyze-initial", response_model=ChatResponse)
async def analyze_initial_idea(
    request: AnalyzeInitialRequest,
    email: str = Depends(get_current_user)
):
    """
    Analiza el párrafo inicial del docente.
    Extrae información clave y genera preguntas dinámicas sobre lo que falta.
    """
    response = ia_service.analyze_initial_idea(
        initial_idea=request.initial_idea,
        material_type=request.material_type
    )

    if "error" in response:
        raise HTTPException(status_code=500, detail=response.get("message", "Error al analizar"))

    return ChatResponse(
        message=response["message"],
        summary=response["summary"],
        interview_complete=False
    )

@router.post("/chat/send-message", response_model=ChatResponse)
async def send_message(
    chat_msg: ChatMessage,
    email: str = Depends(get_current_user)
):
    """
    Envía un mensaje durante la entrevista dinámica.
    La IA solo pregunta lo que falta según la información extraída.
    """

    # Construir contexto con información extraída
    context = chat_msg.context or {
        "tipo_material": chat_msg.material_type or "planificación",
        "idea_inicial": "",
        "extracted_info": chat_msg.extracted_info or {}
    }

    # Generar respuesta con IA
    response = ia_service.generate_response(
        message=chat_msg.message,
        history=chat_msg.history,
        context=context
    )

    if "error" in response:
        raise HTTPException(status_code=500, detail=response.get("message", "Error al generar respuesta"))

    # Determinar si la entrevista está completa
    interview_complete = response.get("interview_complete", False)

    return ChatResponse(
        message=response["message"],
        summary=response["summary"],
        interview_complete=interview_complete
    )

@router.post("/exportar/{format}")
async def export_plan(
    format: str,
    plan_data: dict,
    email: str = Depends(get_current_user)
):
    """
    Exporta la planificación a Word o PDF.
    """
    from app.services.export_service import ExportService

    if format not in ["pdf", "docx"]:
        raise HTTPException(status_code=400, detail="Formato inválido. Use 'pdf' o 'docx'")

    try:
        content = plan_data.get("content", "")
        planificacion = plan_data.get("planificacion", {})

        if format == "docx":
            output = ExportService.export_to_docx(planificacion, content)
            return {
                "file": output.getvalue(),
                "filename": f"planificacion.docx",
                "media_type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            }
        else:  # pdf
            output = ExportService.export_to_pdf(planificacion, content)
            return {
                "file": output.getvalue(),
                "filename": f"planificacion.pdf",
                "media_type": "application/pdf"
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
