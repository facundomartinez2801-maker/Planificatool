# Guía de Instalación Detallada - PlanificaTool

## Paso 1: Instalar Node.js

1. Descargar desde https://nodejs.org (versión LTS recomendada)
2. Ejecutar instalador
3. Verificar instalación:
```bash
node --version
npm --version
```

## Paso 2: Instalar Python

1. Descargar desde https://www.python.org (versión 3.11+)
2. Ejecutar instalador
3. **IMPORTANTE**: Marcar "Add Python to PATH"
4. Verificar instalación:
```bash
python --version
```

## Paso 3: Instalar MongoDB

### Opción A: Local (recomendado para desarrollo)

1. Descargar desde https://www.mongodb.com/try/download/community
2. Ejecutar instalador
3. Durante instalación, seleccionar "Install MongoDB as a Service"
4. MongoDB se iniciará automáticamente

### Opción B: Cloud (MongoDB Atlas)

1. Ir a https://www.mongodb.com/cloud/atlas
2. Crear cuenta gratuita
3. Crear proyecto y cluster (M0 free tier)
4. En "Security", crear usuario y contraseña
5. Copiar connection string

## Paso 4: Obtener API Key de Claude

1. Ir a https://console.anthropic.com
2. Crear cuenta con Google/correo
3. En la sección "API Keys", generar nueva key
4. Copiar la key (guardar en lugar seguro)

## Paso 5: Clonar/Descargar Proyecto

```bash
# Navegar al directorio
cd C:\Users\facun\OneDrive\Desktop\Planificatool

# Verificar que exista la estructura:
# - frontend/
# - backend/
# - README.md
```

## Paso 6: Configurar Backend

### 6.1 Abrir terminal y navegar al backend

```bash
cd backend
```

### 6.2 Crear entorno virtual

```bash
# En Windows:
python -m venv venv

# En macOS/Linux:
python3 -m venv venv
```

### 6.3 Activar entorno virtual

```bash
# En Windows:
venv\Scripts\activate

# En macOS/Linux:
source venv/bin/activate
```

Deberías ver `(venv)` al inicio de la línea.

### 6.4 Instalar dependencias

```bash
pip install -r requirements.txt
```

Esto tardará unos minutos.

### 6.5 Crear archivo .env

```bash
# Copiar el archivo de ejemplo
copy .env.example .env
```

### 6.6 Editar .env

Abrir `backend/.env` con un editor de texto y completar:

```ini
# Database
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=planificatool

# JWT
SECRET_KEY=tu-clave-super-secreta-cambiar-esto-en-produccion
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Claude API
ANTHROPIC_API_KEY=sk-ant-xxxxx  # Tu API key aquí

# Server
DEBUG=True
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

### 6.7 Verificar backend

```bash
# Ejecutar servidor
uvicorn app.main:app --reload

# Deberías ver:
# INFO:     Uvicorn running on http://127.0.0.1:8000
# ✓ Connected to MongoDB

# Abrir http://localhost:8000/docs para ver documentación
```

**Mantén este terminal abierto.**

## Paso 7: Configurar Frontend

### 7.1 Abrir nueva terminal

```bash
cd C:\Users\facun\OneDrive\Desktop\Planificatool\frontend
```

### 7.2 Instalar dependencias

```bash
npm install
```

Esto tardará unos minutos.

### 7.3 Ejecutar servidor de desarrollo

```bash
npm run dev
```

Deberías ver:
```
➜  Local:   http://localhost:5173/
```

## Paso 8: Acceder a la Aplicación

1. Abrir navegador
2. Ir a http://localhost:5173
3. Registrarse con un email y contraseña
4. ¡Comenzar a crear planificaciones!

## Verificar que Todo Funciona

### Checklist

- [ ] Backend servidor corriendo en http://localhost:8000
- [ ] Frontend servidor corriendo en http://localhost:5173
- [ ] MongoDB conectado (ver mensaje en backend)
- [ ] Puedo registrarme en la app
- [ ] Puedo crear una planificación
- [ ] El chat responde (conectado a Claude)

## Problemas Comunes y Soluciones

### ❌ "command not found: npm"

**Causa**: Node.js no está instalado o no está en PATH

**Solución**:
1. Instalar Node.js desde nodejs.org
2. Reiniciar terminal
3. Verificar: `npm --version`

### ❌ "command not found: python"

**Causa**: Python no está instalado o no está en PATH

**Solución**:
1. Instalar Python desde python.org
2. **Importante**: Durante instalación, marcar "Add Python to PATH"
3. Reiniciar terminal
4. Verificar: `python --version`

### ❌ "Cannot connect to MongoDB"

**Causa**: MongoDB no está corriendo

**Solución**:
1. Si es local, asegurarse de que MongoDB esté iniciado:
   - En Windows: buscar "MongoDB" en servicios
   - En macOS: `brew services start mongodb-community`
   - En Linux: `sudo systemctl start mongod`
2. Si es Atlas, verificar:
   - Connection string en .env
   - Firewall/IP whitelist
   - Usuario y contraseña correctos

### ❌ "ANTHROPIC_API_KEY is missing"

**Causa**: No agregaste la API key en .env

**Solución**:
1. Ir a console.anthropic.com
2. Crear API key
3. Copiar en `backend/.env`: `ANTHROPIC_API_KEY=sk-ant-xxxxx`
4. Reiniciar backend

### ❌ "CORS error" en navegador

**Causa**: Frontend y backend no pueden comunicarse

**Solución**:
1. Verificar que backend esté corriendo en puerto 8000
2. Verificar que frontend esté en puerto 5173
3. En `backend/.env`, verificar:
   ```
   CORS_ORIGINS=http://localhost:5173,http://localhost:3000
   ```
4. Reiniciar backend

### ❌ "Error: Invalid token"

**Causa**: Token JWT expiró o es inválido

**Solución**:
1. Cerrar sesión
2. Borrar localStorage en navegador (F12 > Application > Storage)
3. Volver a registrarse

## Próximos Pasos

1. **Explorar la app**: Crear una planificación de prueba
2. **Personalizar**: Modificar la idea inicial y ver sugerencias de Claude
3. **Exportar**: Descargar en Word o PDF
4. **Iterar**: Mejorar funcionalidades según necesidades

## Para Producción

Cuando estés listo para deployment:

1. **Backend**:
   - Cambiar `DEBUG=False` en .env
   - Usar BASE_URL de producción en CORS_ORIGINS
   - Usar MongoDB Atlas en lugar de local
   - Usar SECRET_KEY segura generada con `openssl rand -hex 32`

2. **Frontend**:
   - Ejecutar `npm run build`
   - Deploying resultado en Vercel, Netlify, etc.

3. **Hosting**:
   - Backend: Heroku, Railway, DigitalOcean
   - Frontend: Vercel, Netlify, GitHub Pages

## Soporte

Si tienes problemas:
1. Revisar este archivo de instalación
2. Revisar README.md
3. Revisar logs de terminal
4. Buscar error en Google

¡Espero que disfrutes usando PlanificaTool! 🎓
