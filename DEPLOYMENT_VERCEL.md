# 🚀 Deployment en Vercel - PlanificaTool

**Objetivo:** Publicar la app en producción  
**Tiempo:** ~30 minutos de configuración

---

## 📋 Tabla de Contenidos

1. [Opciones de Deployment](#opciones-de-deployment)
2. [Deployment Frontend en Vercel](#deployment-frontend-en-vercel)
3. [Deployment Backend](#deployment-backend)
4. [Conectar Todo](#conectar-todo)
5. [Verificación](#verificación)

---

## 🎯 Opciones de Deployment

### Frontend (React)
**Recomendación: Vercel** ✅
- Optimizado para Next.js/React
- Deploy automático desde GitHub
- Gratis para pequeños proyectos
- Muy rápido (CDN global)

### Backend (FastAPI/Python)
**Opciones:**

| Plataforma | Precio | Pros | Contras |
|-----------|--------|------|---------|
| **Vercel** | Gratis | Simple, mismo lugar | Limitado para Python |
| **Railway** | $5/mes | Fácil, bueno para Python | Menos popular |
| **Render** | Gratis (con ads) | Muy fácil | Gratis puede dormir |
| **Heroku** | $7/mes | Clásico, confiable | Cambios recientes |
| **DigitalOcean** | $5/mes | Control total | Más complejo |

**Recomendación para V1: Railway o Render** ✅
(Gratuito o muy barato, excelente soporte para Python/FastAPI)

---

## 📦 Deployment Frontend en Vercel

### Paso 1: Preparar Frontend

**Actualizar vite.config.ts para Vercel:**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false, // Desactivar en producción
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:8000',
        changeOrigin: true,
      }
    }
  }
})
```

**Crear `.env.production` (frontend):**

```ini
VITE_API_URL=https://planificatool-api.railway.app
# O donde sea que depliegues el backend
```

**Crear archivo `vercel.json` en root del frontend:**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_API_URL": "@vite_api_url"
  }
}
```

### Paso 2: Conectar GitHub

1. Sube tu proyecto a GitHub:
   ```bash
   cd Planificatool
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/TU_USUARIO/Planificatool.git
   git push -u origin main
   ```

2. Verifica que esté en GitHub:
   - Abre https://github.com/TU_USUARIO/Planificatool

### Paso 3: Crear Proyecto en Vercel

1. Abre https://vercel.com
2. Sign in con GitHub (o crea cuenta)
3. Click "Add New..." → "Project"
4. Selecciona el repo "Planificatool"
5. **IMPORTANTE:** Configura como Monorepo:
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click "Deploy"

**Espera ~2-3 minutos.**

Deberías ver:
```
✓ Deployment successful!
Your site is live at: https://planificatool.vercel.app
```

✅ **Frontend desplegado**

---

## 🐍 Deployment Backend

### OPCIÓN A: Railway (Recomendado para V1)

**Paso 1: Crear cuenta**
1. Abre https://railway.app
2. Sign in con GitHub
3. Click "New Project"

**Paso 2: Conectar GitHub**
1. Selecciona el repo "Planificatool"
2. Railway detectará que hay Python
3. Configura variables de entorno

**Paso 3: Variables de Entorno**

En Railway, agrega:
```
MONGODB_URL=mongodb+srv://usuario:pass@cluster.mongodb.net/planificatool
DATABASE_NAME=planificatool
SECRET_KEY=tu-clave-super-secreta-produccion
ANTHROPIC_API_KEY=sk-ant-xxxxx
DEBUG=False
CORS_ORIGINS=https://planificatool.vercel.app
```

**Paso 4: Dockerfile**

Crear `backend/Dockerfile`:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Paso 5: Deploy**

Railway debería detectar automáticamente y desplegar.

Obtendrás una URL como:
```
https://planificatool-api-production.up.railway.app
```

✅ **Backend desplegado**

---

### OPCIÓN B: Render (Alternativa)

Si prefieres Render:

1. Abre https://render.com
2. Sign in con GitHub
3. Click "New +" → "Web Service"
4. Conecta el repo
5. Configura:
   - Build Command: `pip install -r backend/requirements.txt`
   - Start Command: `cd backend && uvicorn app.main:app --host 0.0.0.0`
   - Root Directory: `/`
6. Agrega variables de entorno (igual que Railway)
7. Deploy

Obtendrás una URL como:
```
https://planificatool-api.onrender.com
```

---

## 🔗 Conectar Todo

Una vez ambos están desplegados, actualiza:

### 1. Frontend - .env.production

```ini
VITE_API_URL=https://planificatool-api-production.up.railway.app
```

### 2. Backend - CORS_ORIGINS

```ini
CORS_ORIGINS=https://planificatool.vercel.app
```

### 3. Redeploy

En Vercel:
- Los cambios en `frontend/` se redeploy automáticamente
- Para el backend, pushea a GitHub y Railway redeploy automáticamente

---

## ✅ Verificación

### Paso 1: Verificar Frontend

```bash
curl https://planificatool.vercel.app
# Deberías recibir HTML de la app
```

### Paso 2: Verificar Backend

```bash
curl https://planificatool-api-production.up.railway.app/health
# Deberías recibir: {"status": "ok"}
```

### Paso 3: Verificar Conexión

1. Abre https://planificatool.vercel.app
2. Intenta registrarte
3. Verifica que se conecta al backend

**Si ves error de CORS:**
```
Access-Control-Allow-Origin
```

Significa que CORS_ORIGINS no está correcto en el backend. Actualiza y redeploy.

---

## 🚨 Problemas Comunes

### "Cannot connect to MongoDB"

**Solución:**
- Verificar que MongoDB Atlas IP whitelist incluya Railway/Render
- En MongoDB Atlas → Network Access → Add IP Address → 0.0.0.0/0 (o tu IP específica)

### "CORS Error"

**Solución:**
```ini
# En backend .env
CORS_ORIGINS=https://planificatool.vercel.app,http://localhost:5173
```

### "API Key de Claude no funciona"

**Solución:**
- Verificar que `ANTHROPIC_API_KEY` esté correcta en variables de entorno
- Verificar que la API key tiene créditos disponibles

### "Base de datos está llena"

**Solución:**
- Si usas MongoDB gratis, hay límite de almacenamiento
- Upgrade a plan pagado o limpia datos de prueba

---

## 📊 Checklist de Deployment

### Pre-Deployment
- [ ] Todo funciona localmente
- [ ] Tests pasan
- [ ] Variables de entorno configuradas
- [ ] Código está en GitHub
- [ ] .env NUNCA está en GitHub (verificar .gitignore)

### Deployment
- [ ] Frontend desplegado en Vercel
- [ ] Backend desplegado en Railway/Render
- [ ] Variables de entorno configuradas
- [ ] CORS configurado correctamente

### Post-Deployment
- [ ] Frontend accesible en URL pública
- [ ] Backend accesible en URL pública
- [ ] Registro funciona
- [ ] Chat funciona
- [ ] Análisis de párrafo inicial funciona
- [ ] Descarga de documentos funciona

---

## 🎯 URLs de Producción

Una vez completado:

```
FRONTEND:  https://planificatool.vercel.app
BACKEND:   https://planificatool-api-production.up.railway.app
```

Compartir con docentes testers:
- Envía: https://planificatool.vercel.app
- Ellos se registran y comienzan a usar

---

## 💡 Próximos Pasos

### Después de Deployment:
1. Invita docentes testers
2. Recolecta feedback
3. Haz ajustes según feedback
4. Prepara V1.1 con mejoras

### Monitoreo:
- Vercel Dashboard: Ver logs de frontend
- Railway Dashboard: Ver logs de backend
- MongoDB Atlas: Monitorear uso

---

## 🔐 Seguridad en Producción

**Checklist:**

- [ ] `DEBUG=False` en backend
- [ ] `SECRET_KEY` es segura (cambiar de default)
- [ ] `ANTHROPIC_API_KEY` nunca en código
- [ ] HTTPS en todas las URLs (Vercel/Railway lo hacen automático)
- [ ] Validación de input en backend
- [ ] Rate limiting configurado (futuro)
- [ ] Backups de MongoDB configurados

---

## 📈 Escala Esperada V1

Con esta configuración:

| Métrica | Capacidad |
|---------|-----------|
| Usuarios simultáneos | ~50 |
| Requests/segundo | ~20 |
| Almacenamiento | 5-10GB (MongoDB) |
| Uptime | 99.5% |
| Costo mensual | $5-10 USD |

Si necesitas más:
- Upgrade Railway/Render plan
- Agregar CDN para frontend
- Agregar caché (Redis)

---

## 📞 Soporte

Si algo falla en deployment:

### Frontend (Vercel)
1. Vercel Dashboard → Deployments → Ver logs
2. GitHub Actions (si está configurado)

### Backend (Railway)
1. Railway Dashboard → Deployments → Ver logs
2. PostgreSQL/MongoDB logs si hay problema de DB

---

*Guía de Deployment - PlanificaTool V1*
