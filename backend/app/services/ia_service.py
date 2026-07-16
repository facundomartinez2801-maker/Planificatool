from anthropic import Anthropic
from app.config import settings
from typing import List, Optional

class IAService:
    def __init__(self):
        self.client = Anthropic(api_key=settings.anthropic_api_key)
        self.model = "claude-3-5-sonnet-20241022"

    def generate_response(self, message: str, history: List[dict], context: dict) -> dict:
        """
        Genera una respuesta de la IA basada en el mensaje del usuario y el contexto.
        """
        # Construir el historial de conversación para Claude
        messages = []

        # Convertir el historial al formato de Claude
        for msg in history:
            messages.append({
                "role": "user" if msg.get("sender") == "user" else "assistant",
                "content": msg.get("text", "")
            })

        # Agregar el nuevo mensaje del usuario
        messages.append({
            "role": "user",
            "content": message
        })

        # Construir el prompt del sistema
        system_prompt = self._build_system_prompt(context)

        try:
            response = self.client.messages.create(
                model=self.model,
                max_tokens=1024,
                system=system_prompt,
                messages=messages
            )

            content = response.content[0].text

            # Extraer resumen (primeras líneas)
            lines = content.split('\n')
            summary = lines[0] if lines else ""

            return {
                "message": content,
                "summary": summary[:100] + "..." if len(summary) > 100 else summary,
                "usage": {
                    "input_tokens": response.usage.input_tokens,
                    "output_tokens": response.usage.output_tokens
                }
            }
        except Exception as e:
            return {
                "message": f"Error al generar respuesta: {str(e)}",
                "summary": "Error",
                "error": True
            }

    def analyze_initial_idea(self, initial_idea: str, material_type: str) -> dict:
        """
        Analiza el párrafo inicial y extrae información clave.
        Identifica qué datos el docente ya proporcionó.
        """
        prompt = f"""Eres un asistente para analizar propuestas educativas.

Lee este párrafo inicial de un docente:
"{initial_idea}"

Extrae EXACTAMENTE esta información (si no aparece, devuelve null):
- pais: País mencionado
- provincia: Provincia/Estado mencionado
- materia: Materia o disciplina
- nivel: Nivel educativo (ej: "3er grado", "1er año secundaria")
- objetivo: Qué quiere trabajar específicamente

Devuelve JSON con estos campos y nada más.
Ejemplo:
{{"pais": "Argentina", "provincia": "Santa Fe", "materia": "Matemáticas", "nivel": "1er año", "objetivo": "Fracciones"}}
"""

        try:
            response = self.client.messages.create(
                model=self.model,
                max_tokens=200,
                messages=[{"role": "user", "content": prompt}]
            )

            import json
            content = response.content[0].text
            extracted = json.loads(content)

            # Generar preguntas sobre lo que falta
            missing = []
            if not extracted.get("pais"):
                missing.append("país/provincia")
            if not extracted.get("materia"):
                missing.append("materia")
            if not extracted.get("nivel"):
                missing.append("nivel educativo")
            if not extracted.get("objetivo"):
                missing.append("qué quieres trabajar")

            # Generar respuesta de la IA
            if missing:
                questions_text = ", ".join(missing)
                ia_message = f"""Perfecto, entiendo tu idea inicial.

Lo que capté hasta ahora:
- {extracted.get('pais', 'País/Provincia')} {f'- {extracted["provincia"]}' if extracted.get("provincia") else ''}
- Materia: {extracted.get('materia', 'No especificada')}
- Nivel: {extracted.get('nivel', 'No especificado')}
- Objetivo: {extracted.get('objetivo', 'No especificado')}

Para hacer una {material_type} excelente, me gustaría que me cuentes un poco más sobre: {questions_text}

¿Podés desarrollar eso?"""
            else:
                ia_message = f"""¡Excelente! Tengo clara tu idea. Vamos a crear una {material_type} coherente y bien estructurada.

Lo que entendí:
- Contexto: {extracted.get('pais')} - {extracted.get('provincia')}
- Materia: {extracted.get('materia')}
- Nivel: {extracted.get('nivel')}
- Objetivo: {extracted.get('objetivo')}

Ahora me gustaría saber un poco más para personalizar mejor:
- ¿Cómo es tu grupo de estudiantes?
- ¿Hay alumnos con adecuaciones curriculares?
- ¿Cuánto tiempo tienes disponible?"""

            return {
                "extracted_info": extracted,
                "message": ia_message,
                "summary": f"Analizando: {material_type} sobre {extracted.get('materia', 'no especificado')} - {extracted.get('nivel', 'nivel no especificado')}"
            }
        except Exception as e:
            return {
                "error": str(e),
                "message": "Disculpa, no pude analizar tu idea. ¿Podés reescribirla con más detalle?"
            }

    def _build_system_prompt(self, context: dict) -> str:
        """
        Construye el prompt del sistema basado en el contexto de la planificación.
        """
        tipo_material = context.get("tipo_material", "planificación")
        idea_inicial = context.get("idea_inicial", "")

        prompt = f"""Eres un asistente pedagógico experto en educación.

Tu tarea es ayudar a docentes a crear {tipo_material} de manera sencilla, sin sesgos y con ayuda de la IA.

CONTEXTO DE LA PLANIFICACIÓN:
- Tipo de material: {tipo_material}
- Idea inicial: {idea_inicial}

INSTRUCCIONES:
1. Responde de forma conversacional y amable
2. Proporciona sugerencias pedagógicas bien fundamentadas
3. Adapta el contenido al nivel educativo mencionado
4. Evita sesgos culturales, de género o socioeconómicos
5. Si necesitas más información, pregunta de forma clara
6. Ofrece opciones alternativas cuando sea relevante

Sé conciso pero informativo. Utiliza un lenguaje accesible para docentes."""

        return prompt

ia_service = IAService()
