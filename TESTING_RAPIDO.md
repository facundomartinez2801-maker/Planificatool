# ⚡ Testing Rápido - Checklist de 10 Minutos

**Si tienes 10 minutos, sigue ESTO exacto:**

---

## 🚀 PASO 1: Terminal 1 - Backend (2 min)

```bash
cd C:\Users\facun\OneDrive\Desktop\Planificatool\backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
# EDITA .env y agrega tu ANTHROPIC_API_KEY
uvicorn app.main:app --reload
```

**Deberías ver:**
```
✓ Connected to MongoDB
INFO: Uvicorn running on http://127.0.0.1:8000
```

✅ **BACKEND LISTO**

---

## 🎨 PASO 2: Terminal 2 - Frontend (3 min)

```bash
cd C:\Users\facun\OneDrive\Desktop\Planificatool\frontend
npm install
npm run dev
```

**Deberías ver:**
```
➜  Local:   http://localhost:5173/
```

✅ **FRONTEND LISTO**

---

## 📝 PASO 3: Crear archivo services/api.ts (3 min)

**En:** `frontend/src/services/api.ts`

**Copiar el contenido completo de la sección "Actualizar services/api.ts"** de `GUIA_INTEGRACION_TESTING.md`

(Este archivo conecta el frontend con el backend)

✅ **SERVICIOS CONECTADOS**

---

## 🧪 PASO 4: Testing en Navegador (2 min)

1. Abre: http://localhost:5173
2. Registrate: `docente@test.com` / `password123`
3. Click "Nueva Planificación" → "Secuencia Didáctica"
4. Escribe párrafo:
   ```
   Una secuencia de matemáticas para 1er año de la secundaria 
   acorde a los lineamientos curriculares de Argentina en la provincia 
   de Santa Fe que funcione para trabajar fracciones
   ```
5. Presiona enviar
6. ✅ **La IA debería responder con lo que entendió y preguntas sobre lo que falta**

---

## ⚠️ Si Algo Falla

### Conectar fallando?
```bash
# Verificar que MongoDB está corriendo
# Windows: Busca "MongoDB" en Servicios y asegúrate que esté "Running"

# Verificar que el backend está respondiendo
curl http://localhost:8000/health
# Debería devolver: {"status":"ok"}
```

### IA no responde?
```bash
# Verificar .env tiene:
# ANTHROPIC_API_KEY=sk-ant-xxxxx (tu API key real)

# Ver error en terminal del backend (busca ERROR en rojo)
```

### CORS error en navegador?
```
Ir a backend/.env y verificar:
CORS_ORIGINS=http://localhost:5173
Luego reiniciar backend
```

---

## 📊 Checklist Mínimo

Después de 10 minutos deberías tener:

- [ ] Backend corriendo sin errores (ves uvicorn running)
- [ ] Frontend corriendo sin errores (ves Local URL)
- [ ] Puedes registrarte en http://localhost:5173
- [ ] Ves el dashboard
- [ ] Puedes crear nueva planificación
- [ ] Puedes escribir párrafo inicial
- [ ] IA responde con análisis y preguntas

**Si todo ✅ → Listo para testing profundo**

Ver `GUIA_INTEGRACION_TESTING.md` para testing exhaustivo.

---

## 🎯 Próximo Paso

Después de esto funcione:
1. Lee `CAMBIOS_IMPLEMENTADOS.md` para entender qué se hizo
2. Sigue `GUIA_INTEGRACION_TESTING.md` para testing exhaustivo
3. Implementa los endpoints pendientes (plantillas, comentarios)
4. Prueba con docentes reales

---

*Guía rápida - 10 minutos para empezar*
