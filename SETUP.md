# 🚀 Setup para Developers - PlanificaTool

Guía para ejecutar el proyecto localmente en tu máquina.

---

## 📋 Requisitos Previos

### Instalados
- [Python 3.11+](https://www.python.org/downloads/)
- [Node.js 18+](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) (local) O [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cloud)

### Verificar instalación

```bash
node --version      # Debe ser v18.x o mayor
python --version    # Debe ser 3.11+
git --version
```

---

## 🔧 Configuración del Backend

### Paso 1: Entrar a la carpeta backend

```bash
cd backend
```

### Paso 2: Crear virtual environment

```bash
# Windows (PowerShell)
python -m venv venv
venv\Scripts\Activate.ps1

# macOS/Linux
python -m venv venv
source venv/bin/activate
```

### Paso 3: Instalar dependencias

```bash
pip install -r requirements.txt
```

### Paso 4: Configurar variables de entorno

```bash
# Copiar template de ejemplo
copy .env.example .env  # Windows
cp .env.example .env    # macOS/Linux
```

**Editar `.env` con:**

**Opción A: MongoDB Local** (desarrollo rápido)
```ini
MONGODB_URL=mongodb://localhost:27017
DEBUG=True
CORS_ORIGINS=http://localhost:5173
```

**Opción B: MongoDB Atlas** (cloud - recomendado para producción)
```ini
MONGODB_URL=mongodb+srv://usuario:password@cluster0.mongodb.net/planificatool
DEBUG=False
CORS_ORIGINS=https://planificatool.vercel.app
```

**Importante:** Agregar tu API key de Claude
```ini
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxx
SECRET_KEY=tu-clave-super-secreta-cambiar-esto
```

### Paso 5: Iniciar Backend

```bash
uvicorn app.main:app --reload
```

Deberías ver:
```
✓ Connected to MongoDB
INFO: Uvicorn running on http://127.0.0.1:8000
```

**✅ Backend listo**

---

## 🎨 Configuración del Frontend

### Paso 1: Abrir nueva terminal

```bash
cd frontend
```

### Paso 2: Instalar dependencias

```bash
npm install
```

### Paso 3: Configurar variables de entorno

```bash
# Copiar template
copy .env.example .env  # Windows
cp .env.example .env    # macOS/Linux
```

**Editar `.env` con:**

```ini
# Desarrollo local
VITE_API_URL=http://localhost:8000
```

### Paso 4: Iniciar Frontend

```bash
npm run dev
```

Deberías ver:
```
➜  Local:   http://localhost:5173/
```

**✅ Frontend listo**

---

## 🧪 Testing Rápido

Con ambos servidores corriendo:

1. Abre http://localhost:5173
2. Registrate: `docente@test.com` / `password123`
3. Click "Nueva Planificación"
4. Escribe un párrafo inicial describiendo tu idea
5. IA debería responder con preguntas dinámicas

---

## 📁 Estructura del Proyecto

```
planificatool/
├── frontend/                    # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/         # Componentes React
│   │   ├── pages/              # Páginas
│   │   ├── services/           # Llamadas a API
│   │   ├── context/            # Estado global
│   │   └── App.tsx
│   ├── package.json
│   ├── .env.example
│   └── vite.config.ts
│
├── backend/                     # Python FastAPI
│   ├── app/
│   │   ├── api/routes/         # Endpoints
│   │   ├── models/             # Esquemas MongoDB
│   │   ├── services/           # Lógica de negocio
│   │   ├── utils/              # Utilidades
│   │   └── main.py
│   ├── requirements.txt
│   ├── Dockerfile              # Para Railway/Docker
│   ├── .env.example
│   └── railway.json            # Config Railway
│
├── .gitignore
├── vercel.json                 # Config Vercel
└── README.md
```

---

## 🔑 Variables de Entorno Explicadas

### Backend (.env)

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `MONGODB_URL` | Conexión a MongoDB | `mongodb://localhost:27017` |
| `DATABASE_NAME` | Nombre de la base de datos | `planificatool` |
| `SECRET_KEY` | Clave para firmar JWT | Generar con `secrets.token_urlsafe(32)` |
| `ANTHROPIC_API_KEY` | API key de Claude | `sk-ant-...` |
| `DEBUG` | Modo debug (local=True, prod=False) | `True` o `False` |
| `CORS_ORIGINS` | URLs permitidas para CORS | `http://localhost:5173` |

### Frontend (.env)

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `VITE_API_URL` | URL del backend | `http://localhost:8000` |

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"

**Solución:**
- Verificar que MongoDB está corriendo
- Windows: Busca "MongoDB" en Servicios
- Si usas Atlas: Verificar que tu IP está en Network Access

```bash
# Verificar conexión MongoDB local
mongo  # O mongosh en versiones nuevas
```

### "CORS Error" en navegador

**Solución:**
Editar `backend/.env`:
```ini
CORS_ORIGINS=http://localhost:5173
```
Reiniciar backend.

### "API key de Claude inválida"

**Solución:**
1. Ir a https://console.anthropic.com/
2. Copiar tu API key (debe empezar con `sk-ant-`)
3. Editar `backend/.env` con la clave correcta
4. Reiniciar backend

### Puerto 5173 o 8000 ya en uso

**Solución - Cambiar puerto:**

Frontend:
```bash
npm run dev -- --port 3000
```

Backend:
```bash
uvicorn app.main:app --port 9000
```

---

## 📚 Comandos Útiles

### Frontend
```bash
npm run dev        # Iniciar servidor de desarrollo
npm run build      # Build para producción
npm run preview    # Preview de build
npm run lint       # Verificar código
```

### Backend
```bash
uvicorn app.main:app --reload    # Con hot-reload
python -m pytest                 # Correr tests (futuro)
```

---

## 🚀 Deployment

### Deployment a Vercel (Frontend)

1. Push a GitHub
2. Ir a https://vercel.com
3. "New Project" → Seleccionar repo
4. Vercel detecta automáticamente el monorepo
5. Deploy automático

Ver: [DEPLOYMENT_VERCEL.md](DEPLOYMENT_VERCEL.md)

### Deployment a Railway (Backend)

1. Push a GitHub
2. Ir a https://railway.app
3. "New Project" → "Deploy from GitHub"
4. Seleccionar repo
5. Railway detecta Dockerfile automáticamente
6. Agregar variables de entorno en Railway dashboard
7. Deploy automático

---

## ✅ Checklist de Setup

- [ ] Python 3.11+ instalado
- [ ] Node.js 18+ instalado
- [ ] Carpetas `frontend/` y `backend/` existen
- [ ] Backend: `python -m venv venv` funciona
- [ ] Backend: `pip install -r requirements.txt` sin errores
- [ ] Backend: `.env` configurado con valores reales
- [ ] Backend: `uvicorn app.main:app --reload` inicia
- [ ] Frontend: `npm install` sin errores
- [ ] Frontend: `.env` configurado
- [ ] Frontend: `npm run dev` inicia
- [ ] Puedo registrarme en http://localhost:5173
- [ ] IA responde en el chat

---

## 📞 Contacto de Soporte

Si tienes problemas:

1. **Verificar logs:**
   - Backend: Ver terminal donde corre uvicorn
   - Frontend: Presiona F12 → Console

2. **Preguntas comunes:**
   - Ver sección "Troubleshooting" arriba
   - Revisar [GUIA_INTEGRACION_TESTING.md](GUIA_INTEGRACION_TESTING.md)

3. **Siguiente paso:**
   - Después de setup exitoso: Ver [GUIA_INTEGRACION_TESTING.md](GUIA_INTEGRACION_TESTING.md)

---

*Última actualización: 2026*
