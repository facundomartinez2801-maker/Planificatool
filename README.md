# PlanificaTool 🎓

Herramienta para ayudar a docentes a planificar clases de manera sencilla y sin sesgos con ayuda de la IA.

## Descripción

PlanificaTool es una aplicación web moderna que facilita la creación de:
- ✅ Secuencias didácticas
- ✅ Planificaciones anuales
- ✅ Planes de clase
- ✅ Proyectos educativos
- ✅ Guiones conjeturales
- ✅ Cualquier otro formato personalizado

Con la ayuda de **Claude AI** para generar sugerencias pedagógicas inteligentes y adaptadas.

## Stack Tecnológico

### Frontend
- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (estilos)
- **Axios** (HTTP client)
- **Lucide Icons** (iconos)

### Backend
- **Python 3.11+**
- **FastAPI** (framework web)
- **MongoDB** (base de datos)
- **Claude API** (integración IA)
- **PyJWT** (autenticación)
- **python-docx** + **reportlab** (exportación)

## Requisitos Previos

- **Node.js 18+** (para frontend)
- **Python 3.11+** (para backend)
- **MongoDB** (local o Atlas cloud)
- **API Key de Anthropic** (Claude API)

## ⚡ Inicio Rápido

**Para setup completo local en 5 minutos:**

```bash
# Ver SETUP.md para instrucciones detalladas
```

### Resumen rápido:

**Terminal 1 - Backend:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate    # Windows
pip install -r requirements.txt
copy .env.example .env   # Editar con tus valores
uvicorn app.main:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
copy .env.example .env   # (opcional - por defecto usa localhost:8000)
npm run dev
```

👉 **Ver [SETUP.md](SETUP.md) para instrucciones detalladas**

## Ejecución

### Terminal 1: Backend

```bash
cd backend

# Activar entorno virtual
venv\Scripts\activate  # Windows

# Ejecutar servidor
uvicorn app.main:app --reload

# El servidor estará disponible en http://localhost:8000
```

### Terminal 2: Frontend

```bash
cd frontend

# Ejecutar servidor de desarrollo
npm run dev

# La app estará disponible en http://localhost:5173
```

## Configuración de Base de Datos

### Opción 1: MongoDB Local

```bash
# Instalar MongoDB Community
# https://www.mongodb.com/try/download/community

# Ejecutar MongoDB
mongod

# En .env:
MONGODB_URL=mongodb://localhost:27017
```

### Opción 2: MongoDB Atlas (Cloud)

1. Ir a https://www.mongodb.com/cloud/atlas
2. Crear cuenta gratuita
3. Crear cluster
4. Obtener connection string
5. En .env:
```
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
```

## Configuración de Claude API

1. Ir a https://console.anthropic.com
2. Crear cuenta o iniciar sesión
3. Crear API key
4. En `.env/backend`:
```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
```

## API Endpoints

### Autenticación
- `POST /auth/register` - Crear cuenta
- `POST /auth/login` - Iniciar sesión
- `GET /auth/me` - Info del usuario actual

### Planificaciones
- `POST /api/planificaciones` - Crear nueva planificación
- `GET /api/planificaciones` - Listar mis planificaciones
- `GET /api/planificaciones/{id}` - Obtener detalles
- `PUT /api/planificaciones/{id}` - Actualizar
- `DELETE /api/planificaciones/{id}` - Eliminar

### Chat & Exportación
- `POST /api/chat` - Enviar mensaje a Claude
- `POST /api/exportar/docx` - Exportar a Word
- `POST /api/exportar/pdf` - Exportar a PDF

## Estructura del Proyecto

```
planificatool/
├── frontend/                    # Aplicación React
│   ├── src/
│   │   ├── components/         # Componentes reutilizables
│   │   ├── pages/              # Páginas principales
│   │   ├── context/            # Context API (Auth, Plan)
│   │   ├── App.tsx             # Componente principal
│   │   └── main.tsx            # Punto de entrada
│   ├── package.json
│   ├── vite.config.ts
│   └── index.html
│
├── backend/                     # Aplicación FastAPI
│   ├── app/
│   │   ├── api/routes/         # Endpoints (auth, planificaciones, chat)
│   │   ├── models/             # Modelos Pydantic
│   │   ├── services/           # Lógica de negocio (IA, exportación)
│   │   ├── utils/              # Utilidades (autenticación)
│   │   ├── config.py           # Configuración
│   │   ├── db.py               # Conexión MongoDB
│   │   └── main.py             # Aplicación principal
│   ├── requirements.txt
│   ├── .env.example
│   └── venv/                   # Entorno virtual
│
└── README.md                    # Este archivo
```

## Flujo de Uso

1. **Registro/Login**: El docente se crea una cuenta
2. **Dashboard**: Ve sus planificaciones previas
3. **Crear Nueva**: Selecciona tipo de material
4. **Idea Inicial**: Describe su idea en lenguaje natural
5. **Chat con IA**: Claude sugiere estructuras y mejoras
6. **Editor**: Edita el documento generado
7. **Exportar**: Descarga como Word o PDF

## Características Principales

### ✨ Inteligencia Artificial
- Claude genera sugerencias pedagógicas contextualizadas
- Valida que el contenido sea apropiado para el nivel educativo
- Evita sesgos culturales y socioeconómicos
- Propone alternativas cuando es relevante

### 📝 Exportación
- Descarga en formato Word (.docx)
- Descarga en formato PDF
- Edición en línea con autoguardado

### 👥 Multi-usuario
- Cada docente tiene sus propias planificaciones
- Datos privados y seguros
- Autenticación con JWT

### 📱 Responsive
- Funciona en desktop, tablet y móvil
- Interfaz intuitiva y accesible

## Desarrollo

### Agregar nuevas funcionalidades

1. **Backend**: Crear ruta en `app/api/routes/`
2. **Frontend**: Crear componente en `src/components/`
3. **Conectar**: Usar `services/api.ts` para comunicación

### Testing

```bash
# Backend (pendiente de agregar tests)
pytest backend/

# Frontend (pendiente de agregar tests)
npm run test
```

## 🚀 Deployment

### Desplegar en Vercel (Frontend) + Railway (Backend)

Para desplegar en producción:

1. **Push a GitHub:**
   ```bash
   git add .
   git commit -m "Configuración lista para deployment"
   git push origin main
   ```

2. **Vercel (Frontend):**
   - Ir a https://vercel.com
   - "New Project" → Seleccionar repo
   - Deploy automático

3. **Railway (Backend):**
   - Ir a https://railway.app
   - "New Project" → Conectar GitHub
   - Railway detecta Dockerfile automáticamente
   - Agregar variables de entorno en dashboard

👉 **Ver [DEPLOYMENT_VERCEL.md](DEPLOYMENT_VERCEL.md) para instrucciones completas**

---

## Troubleshooting

### Error: "Cannot connect to MongoDB"
- Verificar que MongoDB esté corriendo (local) o conexión Atlas (cloud)
- Verificar MONGODB_URL en .env
- Verificar firewall/puertos

### Error: "Invalid API key"
- Verificar ANTHROPIC_API_KEY en .env
- Crear nueva key en https://console.anthropic.com

### Error: "CORS error"
- Verificar CORS_ORIGINS en .env
- Debe incluir `http://localhost:5173` (local) o URL de Vercel (producción)

### Error: "npm not found" o "python not found"
- Instalar Node.js desde https://nodejs.org
- Instalar Python desde https://www.python.org/downloads/

👉 **Ver [SETUP.md](SETUP.md) sección "Troubleshooting" para más problemas comunes**

## Licencia

Proyecto educativo. Libre para uso personal y educativo.

## Contacto

Para preguntas o sugerencias, contactar al equipo de desarrollo.

---

**Made with ❤️ para educadores** 🎓
