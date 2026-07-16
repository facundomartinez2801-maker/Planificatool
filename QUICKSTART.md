# ⚡ Quick Start - PlanificaTool

## Requisitos Previos (5 minutos)

1. Tener instalado:
   - Node.js (https://nodejs.org) ✅
   - Python 3.11+ (https://python.org) ✅
   - MongoDB (https://mongodb.com/try/download/community) ✅

2. Obtener API key de Claude (https://console.anthropic.com) ✅

## Setup (10 minutos)

### 1. Terminal 1: Backend

```bash
# Navegar al proyecto
cd C:\Users\facun\OneDrive\Desktop\Planificatool\backend

# Crear entorno virtual
python -m venv venv

# Activar (Windows)
venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Copiar y editar .env
copy .env.example .env
# ⚠️ Editar con tu ANTHROPIC_API_KEY

# Correr backend
uvicorn app.main:app --reload
```

Deberías ver:
```
✓ Connected to MongoDB
INFO: Uvicorn running on http://127.0.0.1:8000
```

### 2. Terminal 2: Frontend

```bash
# En otra terminal
cd C:\Users\facun\OneDrive\Desktop\Planificatool\frontend

# Instalar dependencias
npm install

# Ejecutar dev server
npm run dev
```

Deberías ver:
```
➜  Local:   http://localhost:5173/
```

## Usar la Aplicación (2 minutos)

1. Abrir http://localhost:5173
2. Registrarse con email y contraseña
3. Seleccionar tipo de material (ej: "Secuencia Didáctica")
4. Escribir idea inicial (ej: "Plantas nativas para 5to grado")
5. Chequear con Claude → Editor → Exportar a Word/PDF

## Troubleshooting Rápido

| Problema | Solución |
|----------|----------|
| ❌ `npm not found` | Instalar Node.js y reiniciar terminal |
| ❌ `python not found` | Instalar Python con "Add to PATH" y reiniciar |
| ❌ Cannot connect MongoDB | Asegurar `mongod` está corriendo |
| ❌ CORS error | Verificar que backend corra en puerto 8000 |
| ❌ Invalid API key | Copiar correctamente ANTHROPIC_API_KEY en .env |

## Estructura Rápida

```
Planificatool/
├── frontend/         ← React (puerto 5173)
├── backend/          ← FastAPI (puerto 8000)
└── README.md         ← Documentación completa
```

## APIs Principales

```bash
# Test endpoints
curl http://localhost:8000/health
curl http://localhost:8000/docs  # Ver toda la documentación

# Register
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456","nombre":"Test"}'

# Login
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
```

## Pasos Siguientes

1. ✅ **Explorar la app**: Crear tu primer plan
2. ✅ **Personalizar**: Modificar componentes en `frontend/src/`
3. ✅ **Extender**: Agregar nuevas rutas en `backend/app/api/routes/`
4. ✅ **Deployar**: Ver secciones de producción en README.md

## Documentación Completa

- **README.md** - Descripción y configuración
- **INSTALL.md** - Guía paso a paso
- **FUTURE_IMPROVEMENTS.md** - Roadmap
- **Backend Docs** - http://localhost:8000/docs (cuando esté corriendo)

## Ayuda

Si algo no funciona:
1. Revisar terminal para ver errores
2. Leer INSTALL.md para soluciones comunes
3. Verificar que todos los requisitos estén instalados

---

**¡Listo para crear planificaciones! 🎓**

Cualquier pregunta, revisar la documentación completa en README.md
