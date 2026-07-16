# 🔗 Guía de Integración y Testing - PlanificaTool

**Fecha:** 9 de Julio, 2024  
**Objetivo:** Conectar Frontend ↔ Backend y hacer testing del flujo completo

---

## 📋 Tabla de Contenidos

1. [Setup Inicial](#setup-inicial)
2. [Actualizar services/api.ts](#actualizar-servicesapts)
3. [Flujo de Testing Paso a Paso](#flujo-de-testing-paso-a-paso)
4. [Checklist de Validación](#checklist-de-validación)
5. [Debugging](#debugging)

---

## 🚀 Setup Inicial

### Paso 1: Verificar que tengas todo instalado

```bash
# Verificar Node.js
node --version  # Debe mostrar v18.x o mayor

# Verificar Python
python --version  # Debe mostrar 3.11+

# Verificar MongoDB está corriendo
# En Windows: MongoDB debería estar en servicios
# En Mac: brew services list | grep mongodb
```

### Paso 2: Instalar dependencias

**Terminal 1 - Backend:**
```bash
cd C:\Users\facun\OneDrive\Desktop\Planificatool\backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

**Terminal 2 - Frontend:**
```bash
cd C:\Users\facun\OneDrive\Desktop\Planificatool\frontend
npm install
```

### Paso 3: Configurar variables de entorno

**Backend (.env):**
```ini
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=planificatool
SECRET_KEY=tu-clave-super-secreta-cambiar-esto
ANTHROPIC_API_KEY=sk-ant-xxxxx  # Tu API key de Claude
DEBUG=True
CORS_ORIGINS=http://localhost:5173
```

---

## 🔧 Actualizar services/api.ts

**Archivo:** `frontend/src/services/api.ts`

**Crear este archivo con:**

```typescript
import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: (email: string, password: string, nombre: string) =>
    api.post('/auth/register', { email, password, nombre }),
  
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  getCurrentUser: () =>
    api.get('/auth/me'),
};

export const planificacionService = {
  create: (data: any) =>
    api.post('/api/planificaciones', data),
  
  list: () =>
    api.get('/api/planificaciones'),
  
  get: (id: string) =>
    api.get(`/api/planificaciones/${id}`),
  
  update: (id: string, data: any) =>
    api.put(`/api/planificaciones/${id}`, data),
  
  delete: (id: string) =>
    api.delete(`/api/planificaciones/${id}`),
};

export const chatService = {
  // Nuevo endpoint: Analizar párrafo inicial
  analyzeInitial: (initial_idea: string, material_type: string) =>
    api.post('/api/chat/analyze-initial', {
      initial_idea,
      material_type,
    }),
  
  // Nuevo endpoint: Enviar mensaje en entrevista dinámica
  sendMessage: (
    message: string,
    history: any[],
    extracted_info: any,
    material_type: string
  ) =>
    api.post('/api/chat/send-message', {
      message,
      history,
      extracted_info,
      material_type,
    }),
  
  // Futuro: Aplicar comentarios
  applyComments: (comments: any[], document_id: string) =>
    api.put(`/api/documento/aplicar-cambios`, {
      comments,
      document_id,
    }),
};

export const documentService = {
  // Futuro: Generar documento desde entrevista
  generate: (planificacion: any, template_type: 'upload' | 'generate') =>
    api.post('/api/documento/generar', {
      planificacion,
      template_type,
    }),
  
  // Futuro: Exportar
  exportWord: (document_id: string) =>
    api.get(`/api/exportar/word/${document_id}`, {
      responseType: 'blob',
    }),
  
  exportPdf: (document_id: string) =>
    api.get(`/api/exportar/pdf/${document_id}`, {
      responseType: 'blob',
    }),
};

export default api;
```

---

## 🧪 Flujo de Testing Paso a Paso

### FASE 1: Testing del Backend Solo

**Paso 1.1 - Verificar que el backend está corriendo**

```bash
# Terminal 1
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload
```

Deberías ver:
```
✓ Connected to MongoDB
INFO: Uvicorn running on http://127.0.0.1:8000
```

**Paso 1.2 - Probar endpoints básicos**

Abre Postman o usa curl en PowerShell:

```powershell
# Verificar que el servidor está vivo
Invoke-WebRequest http://localhost:8000/health

# Deberías recibir: {"status": "ok"}
```

**Paso 1.3 - Probar login/registro**

```powershell
# Registrarse
$body = @{
    email = "docente@test.com"
    password = "password123"
    nombre = "Docente Test"
} | ConvertTo-Json

Invoke-WebRequest -Uri http://localhost:8000/auth/register `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body
```

Deberías recibir:
```json
{
  "access_token": "eyJ...",
  "token_type": "bearer",
  "user": {
    "id": "...",
    "email": "docente@test.com",
    "nombre": "Docente Test"
  }
}
```

**Paso 1.4 - Guardar el token**

```powershell
# Copiar el access_token del resultado anterior
$TOKEN = "eyJ..."  # Reemplaza con tu token
```

**Paso 1.5 - Probar nuevo endpoint: Analizar párrafo inicial**

```powershell
$body = @{
    initial_idea = "Una secuencia de matemáticas para 1er año de la secundaria acorde a los lineamientos curriculares de Argentina en la provincia de Santa Fe que funcione para trabajar las fracciones"
    material_type = "secuencia"
} | ConvertTo-Json

Invoke-WebRequest -Uri http://localhost:8000/api/chat/analyze-initial `
  -Method POST `
  -Headers @{
    "Content-Type" = "application/json"
    "Authorization" = "Bearer $TOKEN"
  } `
  -Body $body
```

Deberías recibir:
```json
{
  "message": "Perfecto, entiendo tu idea inicial...",
  "summary": "Analizando: secuencia sobre fracciones...",
  "interview_complete": false
}
```

**✅ Si llega aquí, el backend está funcionando correctamente.**

---

### FASE 2: Testing del Frontend con Backend

**Paso 2.1 - Iniciar frontend**

```bash
# Terminal 2
cd frontend
npm run dev
```

Deberías ver:
```
➜  Local:   http://localhost:5173/
```

**Paso 2.2 - Abrir la app en navegador**

- Abre: http://localhost:5173
- Deberías ver la pantalla de login
- Registrate con: `docente@test.com` / `password123`

**Paso 2.3 - Testing del flujo completo**

1. **Login correcto:**
   - ✅ Poder registrarse
   - ✅ Ver dashboard vacío
   - ✅ Token se guarda en localStorage

2. **Crear nueva planificación:**
   - ✅ Click en "Nueva Planificación"
   - ✅ Seleccionar "Secuencia Didáctica"
   - ✅ Se abre chat con mensaje de bienvenida

3. **Párrafo inicial:**
   - ✅ Ver instrucción de qué escribir
   - ✅ Escribir párrafo con país, nivel, materia, objetivo
   - ✅ Presionar enviar
   - ✅ IA extrae información y responde con preguntas

**Esperado:**
```
Docente escribe:
"Una secuencia de matemáticas para 1er año de la secundaria acorde 
a los lineamientos curriculares de Argentina en la provincia de Santa Fe 
que funcione para trabajar las fracciones"

IA responde:
"Perfecto, entiendo tu idea inicial.
Lo que capté hasta ahora:
- Argentina - Santa Fe
- Materia: matemáticas
- Nivel: 1er año
- Objetivo: fracciones

Para hacer una secuencia excelente, me gustaría que me cuentes 
un poco más sobre: grupo de alumnos, adecuaciones curriculares, 
tiempo disponible"
```

---

### FASE 3: Testing de Componentes Nuevos

**Paso 3.1 - Testing de TemplateUploadModal**

1. Después de la entrevista, presionar "Generar Documento"
2. Deberías ver pantalla emergente con 2 opciones:
   - ✅ "Cargar mi plantilla" (con input de archivo)
   - ✅ "Que la IA diseñe una plantilla" (botón)

3. Probar "Cargar mi plantilla":
   - ✅ Click abre diálogo de archivo
   - ✅ Selecciona Word o PDF
   - ✅ Aparece nombre del archivo
   - ✅ Click "Usar esta plantilla" funciona

**Paso 3.2 - Testing de CommentThread**

1. Después de generar documento, ver botón flotante en esquina
2. Click en botón de comentarios (debe mostrar número 0)
3. Selecciona texto en el documento
4. Haz click en panel de comentarios
5. Escribe un comentario: "Cambiar esto por algo más dinámico"
6. ✅ Comentario aparece en el panel
7. ✅ Click "Aplicar cambios" dispara acción

---

## 📋 Checklist de Validación

### Backend
- [ ] `uvicorn app.main:app --reload` inicia sin errores
- [ ] MongoDB conecta (ves "✓ Connected to MongoDB")
- [ ] Health check funciona (`/health` devuelve `{"status": "ok"}`)
- [ ] Login/registro funciona
- [ ] Token JWT se genera correctamente
- [ ] `/api/chat/analyze-initial` extrae información correctamente
- [ ] IA genera preguntas sobre lo que falta
- [ ] Múltiples mensajes funcionan correctamente

### Frontend
- [ ] `npm run dev` inicia sin errores
- [ ] Se ve la pantalla de login
- [ ] Registro funciona
- [ ] Dashboard se carga después de login
- [ ] "Nueva Planificación" abre selector de tipo
- [ ] Seleccionar tipo abre el chat
- [ ] Chat inicial muestra instrucción de párrafo
- [ ] TemplateUploadModal aparece después de entrevista
- [ ] CommentThread botón flotante funciona
- [ ] Comentarios se pueden agregar y eliminar

### Integración
- [ ] Frontend → Backend comunicación funciona
- [ ] Análisis inicial del párrafo extrae datos
- [ ] Preguntas dinámicas son relevantes
- [ ] Multiple rondas de chat funcionan
- [ ] Comentarios no generan errores

---

## 🐛 Debugging

### Problema: "Cannot connect to MongoDB"

**Solución:**
```bash
# Verificar que MongoDB está corriendo
# Windows: Busca "MongoDB" en Servicios
# Si no está instalado:
# https://www.mongodb.com/try/download/community

# Verificar conexión
python -c "from pymongo import MongoClient; MongoClient('mongodb://localhost:27017')"
```

### Problema: "CORS error" en frontend

**Solución:**
Verificar `backend/.env`:
```ini
CORS_ORIGINS=http://localhost:5173
```

Si no está, agregar y reiniciar backend.

### Problema: "Token inválido"

**Solución:**
```bash
# Borrar localStorage en navegador
# Presiona F12 → Application → Storage → localStorage → Borrar todo
# Volver a registrarse
```

### Problema: "IA no responde correctamente"

**Solución:**
1. Verificar `ANTHROPIC_API_KEY` en `.env`
2. Verificar que el párrafo inicial tenga: país, nivel, materia, objetivo
3. Ver logs del backend para errores de Claude API

### Ver logs en tiempo real

**Backend:**
```bash
# Los logs aparecen en la terminal donde corre uvicorn
# Ver mensajes de ERROR especialmente
```

**Frontend:**
```bash
# Presiona F12 → Console
# Busca errores en rojo
# Mira Network tab para ver peticiones HTTP
```

---

## 🔍 Testing Paso a Paso Detallado

### Test Completo: Flujo End-to-End

**Duración:** ~5 minutos

**Pasos:**

1. **Iniciar Backend (Terminal 1)**
   ```bash
   cd backend && venv\Scripts\activate && uvicorn app.main:app --reload
   ```

2. **Iniciar Frontend (Terminal 2)**
   ```bash
   cd frontend && npm run dev
   ```

3. **Registrarse en la app**
   - Email: `docente@test.com`
   - Contraseña: `password123`
   - Nombre: `Docente Test`

4. **Crear nueva planificación**
   - Click "Nueva Planificación"
   - Seleccionar "Secuencia Didáctica"
   - Confirmar

5. **Escribir párrafo inicial**
   ```
   Una secuencia de Matemáticas para 1er año de la secundaria 
   acorde a los lineamientos curriculares de Argentina en la provincia 
   de Santa Fe que funcione para trabajar las fracciones
   ```

6. **Verificar que IA responde**
   - ✅ Debería extraer: Argentina, Santa Fe, Matemáticas, 1er año
   - ✅ Debería preguntar sobre: grupo, adecuaciones, tiempo, recursos

7. **Responder preguntas de IA**
   - Escribir: "Tengo 25 alumnos, 4 con problemas de aprendizaje"
   - Presionar enviar

8. **Generar documento**
   - Presionar "Generar documento"
   - Elegir "Que la IA diseñe una plantilla"

9. **Ver documento generado**
   - ✅ Debería tener: Fundamentación, Objetivos, Descripción, Evaluación

10. **Probar comentarios**
    - Seleccionar texto
    - Click en botón flotante
    - Escribir comentario
    - Presionar "Aplicar cambios"

**Si todo esto funciona → ✅ Integración exitosa**

---

## 📞 Contacto de Soporte

Si encuentras problemas:

1. **Verificar logs:**
   - Backend: Ver terminal donde corre uvicorn
   - Frontend: F12 → Console

2. **Common issues:**
   - MongoDB no conecta → Verificar servicio MongoDB
   - CORS error → Verificar CORS_ORIGINS en .env
   - Token inválido → Borrar localStorage y re-registrarse

3. **Siguiente paso:**
   - Si todo funciona → Pasar a pruebas con docentes reales
   - Si hay errores → Revisar logs y hacer debug

---

## 📊 Métricas de Éxito

**Después de completar este testing, deberías tener:**

| Métrica | Esperado |
|---------|----------|
| Backend endpoints respondiendo | 100% |
| Frontend conectando a backend | 100% |
| Análisis de párrafo inicial | Correcto |
| Preguntas dinámicas | Relevantes |
| Componentes nuevos visibles | Sí |
| Sin errores en console | Sí |
| Flujo end-to-end funcional | Sí |

---

*Documento creado: 9 de Julio, 2024*  
*Guía de Integración y Testing - PlanificaTool V1*
