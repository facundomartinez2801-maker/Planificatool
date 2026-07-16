# 📋 RESUMEN DE ENTREVISTA - PlanificaTool

**Fecha:** 9 de Julio, 2024  
**Proyecto:** PlanificaTool - Herramienta de Planificación Educativa con IA  
**Fase:** V1 - Prototipo

---

## 1. OBJETIVO DEL PROYECTO

**PlanificaTool es una herramienta web que ayuda a docentes a sistematizar la experiencia de planificar.**

- **Problema que resuelve:** Los docentes tienen ideas sueltas pero falta coherencia entre:
  - Lo que dice el diseño curricular
  - Lo que el docente propone (secuencia)
  - Lo que se traduce en actividades reales
  
- **Solución:** La app sistematiza esas ideas a través de una entrevista guiada por IA, garantizando coherencia desde el inicio hasta el documento final.

- **Beneficio final:** Aligeran la carga de trabajo en planificación y transforman ideas desorganizadas en documentos útiles y profesionales.

---

## 2. USUARIOS

**Destinatarios:** TODO TIPO DE DOCENTES
- Docentes expertos en tecnología
- Docentes sin experiencia digital
- Cualquier nivel educativo (primaria, secundaria, universidad)
- Cualquier materia/disciplina

**Contexto:** Versión 1 como prototipo compartido con **pocos docentes seleccionados** para testing

---

## 3. FLUJO PASO A PASO

### Fase 1: Selección de Tipo de Documento
1. Docente inicia sesión en la aplicación
2. Ve el **dashboard** con sus planificaciones anteriores
3. Presiona **"+ Nueva Planificación"**
4. Se abre pantalla de selección de tipo:
   - Secuencia Didáctica
   - Planificación Anual
   - Plan de Clases
   - Guion Conjetural
   - Proyecto Educativo
   - Otro (personalizado)

### Fase 2: Descripción Inicial
1. Docente selecciona un tipo (ej: "Secuencia Didáctica")
2. Se abre **pantalla de chat**
3. Aparece un **texto ejemplo** que muestra cómo escribir:
   ```
   "Una secuencia de matemáticas para 1er año de la secundaria 
   acorde a los lineamientos curriculares de Argentina en la 
   provincia de Santa Fe que funcione para trabajar lo siguiente..."
   ```
4. Docente escribe un **párrafo inicial** describiendo su idea en términos similares

### Fase 3: Entrevista Dinámica con IA
1. **IA analiza** el párrafo inicial y extrae:
   - Sistema educativo (país/provincia)
   - Materia/espacio
   - Nivel educativo
   - Lo que el docente quiere trabajar

2. **IA identifica qué FALTA** y hace preguntas dinámicas (solo lo que no está cubierto):
   - ¿Cómo es el grupo de alumnos?
   - ¿Hay alumnos con adecuaciones curriculares?
   - ¿Cuánto tiempo disponible tenés?
   - ¿Qué recursos tenés?
   - ¿Cuáles son los objetivos específicos?
   - ¿Hay actividades específicas que quieras incluir?
   - ¿Cómo querés evaluar?

3. **Tipos de entrevista:**
   - **Corta:** Docente describió mucho en el párrafo inicial → IA solo corrobora
   - **Larga:** Docente describió poco → IA hace entrevista completa
   - **Flexible:** IA se adapta a lo que el docente proporciona

4. **IA propone ejemplos contextualizados** en cada pregunta:
   - Según edad/grado de estudiantes
   - Según diseño curricular de la provincia/país
   - Según forma de evaluar
   - Según recursos disponibles

5. **Docente responde** y la conversación continúa hasta que ambos (docente e IA) dan por finalizada la entrevista

### Fase 4: Selección de Plantilla
1. Docente presiona botón **"Generar Documento"**
2. Se abre **pantalla emergente** con 2 opciones:

   **OPCIÓN A: "Cargar Plantilla"**
   - Docente sube un documento (Word o PDF) con su plantilla institucional
   - IA **analiza la estructura** de esa plantilla
   - IA genera un documento similar, completado con datos de la entrevista
   - Resultado: documento editable en la plataforma

   **OPCIÓN B: "Generar Plantilla"**
   - IA genera una plantilla desde cero
   - Usa estructura estándar para ese tipo de documento
   - Completa con todos los datos de la entrevista
   - Resultado: documento editable en la plataforma

### Fase 5: Edición y Refinamiento
1. Docente ve el **documento generado** en pantalla editable
2. Puede **editar directamente** el contenido
3. Si quiere que **IA haga cambios específicos:**
   - Marca comentarios (como Google Docs)
   - Presiona botón **"Aplicar cambios"**
   - IA lee comentarios y realiza cambios
   - **Múltiples rondas:** Docente puede seguir comentando y la IA sigue mejorando
4. Una vez satisfecho, docente presiona:
   - **"Descargar .Doc"** (para seguir editando después)
   - **"Descargar .PDF"** (para versión final lista para imprimir/compartir)

### Fase 6: Gestión de Documentos
1. Documento se **guarda en la plataforma** (en la cuenta del docente)
2. Docente puede **acceder después** a sus planificaciones anteriores
3. Puede **retomar documentos** a mitad de camino
4. Puede **descargar o eliminar** según necesite

---

## 4. INFORMACIÓN QUE RECOPILA LA IA

La IA debe extraer/confirmar estos 10 puntos a través de la entrevista:

1. **Sistema educativo** (país/provincia/región)
2. **Materia/espacio educativo**
3. **Nivel educativo** (año/grado/curso/rango etario)
4. **Descripción del grupo de estudiantes** (características, dinámicas, cantidad)
5. **Alumnos con adecuaciones curriculares** (necesidades especiales, inclusión)
6. **Duración/tiempo disponible** (semanas, horas, sesiones)
7. **Recursos disponibles** (materiales, tecnología, espacios)
8. **Objetivos específicos** (qué quiere lograr el docente)
9. **Actividades específicas deseadas** (salida de campo, experimentos, tecnología, trabajo colaborativo, etc)
10. **Forma de evaluar** (rúbrica, observación, examen, proyecto, etc)

---

## 5. ESTRUCTURA DE DOCUMENTOS

### Estructura Universal (TODAS las planificaciones)

Toda planificación tiene estas secciones principales:

1. **Fundamentación** (el por qué - generada por IA)
2. **Objetivos** (qué se quiere lograr - generada por IA)
3. **Descripción de lo que se va a hacer** (el NÚCLEO - varía según plantilla)
4. **Evaluación** (cómo se evalúa - generada por IA)

### Secciones Opcionales

- **Descripción del grupo** (si la plantilla lo incluye):
  - Si la IA tiene datos: completa
  - Si falta: deja en blanco con leyenda "Completar manualmente"

### Variabilidad según Plantilla

La sección de "lo que se va a hacer" varía según el tipo de documento:

- **Secuencia Didáctica:** Encuentros/sesiones por semana
- **Plan de Clase:** Desarrollo de una jornada específica
- **Planificación Anual:** Distribución de contenidos por trimestre/mes
- **Proyecto:** Fases del proyecto con actividades
- **Guion Conjetural:** Narrativa del desarrollo esperado

---

## 6. OUTPUTS ESPERADOS

### Documento Editable
- Formato: Documento editable en la plataforma (similar a Google Docs)
- Contenido: Completo, coherente y contextualizado
- Estructura: Adaptada a la plantilla elegida
- Editabilidad: 100% personalizable por el docente

### Descargas
- **Word (.docx):** Para seguir editando después
- **PDF:** Para versión final/impresión/compartir

### Gestión de Documentos
- Se guarda automáticamente en la plataforma
- Accesible desde el dashboard
- Posibilidad de retomar/editar después

---

## 7. REGLAS PRINCIPALES

### Lógica de la IA

1. **Análisis dinámico:** La IA solo pregunta lo que falta, nunca información redundante
2. **Propuestas contextualizadas:** Todos los ejemplos se adaptan al sistema educativo, nivel y grupo específico
3. **Coherencia garantizada:** La entrevista sistematiza ideas sueltas en una estructura coherente
4. **Respeto a plantillas:** Si el docente carga plantilla, la IA respeta su estructura
5. **Iteración permitida:** Docente puede hacer cambios ilimitados mediante comentarios

### Seguridad (V1 - Crítico)

1. **Autenticación segura:** Login con contraseñas encriptadas
2. **Datos privados:** Cada docente solo ve sus propias planificaciones
3. **Encriptación:** Todos los datos se almacenan encriptados en la BD
4. **HTTPS:** Conexión segura en toda la aplicación
5. **Tokens seguros:** Sesiones con expiración y renovación segura
6. **Privacidad de datos sensibles:** Nombres de estudiantes y características del grupo protegidas

### Reglas del Documento

1. **Estructura universal:** Siempre tiene Fundamentación, Objetivos, Descripción, Evaluación
2. **Adaptación a plantilla:** Si hay plantilla, respeta su estructura
3. **Completitud:** IA rellena secciones; docente rellena lo que sea necesario
4. **Editabilidad:** Docente puede cambiar cualquier cosa después

---

## 8. EXCEPCIONES Y CASOS LÍMITE

### Casos Contemplados

1. **Docente describe TODO en párrafo inicial**
   - IA lo corrobora y pregunta "¿Tenés todo claro?"
   - Puede ir directo a generar documento

2. **Docente describe muy poco**
   - IA hace entrevista larga y detallada
   - Se adapta al ritmo del docente

3. **Plantilla sin ciertos campos**
   - IA deja espacios en blanco con instrucciones
   - Docente los completa manualmente

4. **Docente quiere cambios múltiples**
   - Puede comentar ilimitadamente
   - IA aplica cada ronda de cambios

5. **Plantilla con estructura desconocida**
   - IA intenta analizarla y adaptarse lo máximo posible
   - Docente edita manualmente si es necesario

### Casos NO Cubiertos en V1

- Colaboración entre docentes (compartir planificaciones)
- Integración con sistemas curriculares específicos (acceso a bases de datos de diseños curriculares)
- Notificaciones/recordatorios
- Exportación a plataformas educativas (Google Classroom, Moodle, etc)

---

## 9. CRITERIOS DE CALIDAD

### El documento es BUENO si:

1. ✅ **Coherencia:** Hay alineamiento perfecto entre currículo → propuesta → actividades → evaluación
2. ✅ **Completitud:** Todas las secciones están rellenas apropiadamente
3. ✅ **Contextualización:** Objetivos, ejemplos y actividades se adaptan al nivel/grupo/sistema educativo
4. ✅ **Practicidad:** El docente puede ejecutarlo sin problemas en el aula
5. ✅ **Editabilidad:** Docente puede cambiar fácilmente cualquier sección
6. ✅ **Formato profesional:** Se ve como un documento educativo serio y bien estructurado
7. ✅ **Inclusión:** Considera adecuaciones curriculares si las hay
8. ✅ **Evaluación clara:** Los criterios de evaluación son específicos y medibles

### Indicadores de Éxito

- Docente puede generar una planificación en < 30 minutos
- Documento es usable como está (sin cambios mayores)
- Docente puede hacer cambios fácilmente
- Docente descarga y usa en clase sin problemas

---

## 10. AMBIGÜEDADES Y RIESGOS PENDIENTES

### Técnicos

1. **Base de datos de diseños curriculares:**
   - ¿Cómo la IA obtendrá información sobre cada diseño curricular?
   - ¿Necesita ser entrenada con documentos oficiales?
   - ¿Qué países/provincias se incluyen en V1?

2. **Análisis de plantillas:**
   - ¿La IA puede reconocer estructura de cualquier plantilla Word/PDF?
   - ¿Hay límites en formatos que puede analizar?
   - ¿Cómo maneja plantillas muy diferentes a las esperadas?

3. **Generación de contenido:**
   - ¿Cómo la IA adaptará contenido a diseños curriculares específicos?
   - ¿Validación de que el contenido es pedagógicamente correcto?

### De Negocio

1. **Límites de almacenamiento (V1):**
   - ¿Cuántas planificaciones puede guardar un docente gratis?
   - ¿Qué sucede cuando supera el límite?

2. **Costo de API de Claude:**
   - ¿Cuántos tokens gastará por documento?
   - ¿Es sostenible para muchos usuarios?

3. **Modelo freemium:**
   - ¿Cuál será el precio de la versión pago?
   - ¿Cuántas planificaciones incluye?

### De Experiencia de Usuario

1. **Claridad del párrafo inicial:**
   - ¿El ejemplo es suficientemente claro?
   - ¿Todos los docentes entenderán qué escribir?

2. **Flujo de comentarios:**
   - ¿Los docentes entenderán cómo comentar para que IA cambie?
   - ¿Necesita tutorial?

3. **Soporte post-generación:**
   - ¿Qué pasa si el docente tiene dudas después de descargar?
   - ¿Hay soporte técnico?

---

## 11. MODELO DE NEGOCIO (Futuro)

### V1: Prueba de Concepto (Gratis)
- Compartido con pocos docentes seleccionados
- Funcionalidad completa
- Seguridad implementada desde el inicio
- Sin límites artificiales (o muy generosos)

### Versión Pago (Futuro)
- **Plan Gratuito:** Límite de planificaciones (ej: 5-10)
- **Plan Premium:** Almacenamiento ilimitado + soporte prioritario
- **Docente descarga:** Si supera límite, debe descargar para no perder
- **Pérdida de acceso:** Sin pago, pierde acceso a viejas planificaciones no descargadas

---

## 12. REQUERIMIENTOS DE SEGURIDAD (V1)

### Autenticación
- ✅ Contraseñas encriptadas con bcrypt
- ✅ Login seguro
- ✅ Tokens JWT con expiración
- ✅ Renovación automática de sesión

### Datos Privados
- ✅ Cada docente solo ve sus documentos
- ✅ Encriptación en base de datos
- ✅ Restricción de acceso por usuario_id

### Comunicación
- ✅ HTTPS en toda la aplicación
- ✅ Variables de entorno para API keys
- ✅ No exponer información sensible

### Privacidad
- ✅ Cumplimiento básico GDPR (para futuro)
- ✅ Protección de datos de estudiantes mencionados
- ✅ Política de privacidad clara

---

## 13. SIGUIENTE PASO RECOMENDADO

### Inmediato (Esta Semana)

1. **Refinar arquitectura técnica:**
   - Confirmar: ¿Cómo la IA accede a diseños curriculares?
   - Definir: Países/provincias soportados en V1
   - Definir: Límites de almacenamiento

2. **Crear guía de uso:**
   - Tutorial: Cómo escribir el párrafo inicial
   - Tutorial: Cómo comentar para cambios
   - FAQ: Preguntas comunes

3. **Seleccionar docentes testers:**
   - 5-10 docentes de diferentes niveles
   - Diferentes provincias/países si es posible
   - Plan de feedback

### Corto Plazo (Próximas 2-4 Semanas)

1. **Implementar V1 completa** con:
   - Autenticación segura
   - Flujo entrevista-documento
   - Edición y comentarios
   - Descargas (Word/PDF)

2. **Testing interno:**
   - Pruebas de seguridad básicas
   - Pruebas de flujo completo
   - Pruebas con docentes beta

3. **Recolectar feedback:**
   - ¿Es claro el párrafo inicial?
   - ¿La entrevista responde lo que necesita?
   - ¿El documento es usable?
   - ¿Hay errores pedagógicos?

### Largo Plazo (Después de V1)

1. **Validación de diseños curriculares:**
   - Integración con bases de datos oficiales
   - Validación de contenido
   - Múltiples países/provincias

2. **Funcionalidades avanzadas:**
   - Compartir planificaciones
   - Colaboración entre docentes
   - Análisis de sesgos pedagógicos
   - Integración con plataformas educativas

3. **Monetización:**
   - Implementar plan freemium
   - Definir precios
   - Marketing educativo

---

## 📊 MATRIZ RESUMEN

| Aspecto | Descripción |
|---------|------------|
| **Usuario** | TODO tipo de docentes (sin límite técnico) |
| **Problema** | Falta de coherencia currículo → planificación → actividades |
| **Solución** | Entrevista guiada por IA que sistematiza ideas |
| **Flujo** | Seleccionar tipo → Descripción → Entrevista dinámica → Plantilla → Edición → Descarga |
| **Información recopilada** | 10 puntos (sistema educativo, grupo, objetivos, actividades, evaluación, etc) |
| **Output** | Documento editable completo (Word/PDF) |
| **Seguridad** | Contraseñas encriptadas, datos privados, HTTPS, tokens seguros |
| **Modelo** | Gratis V1, freemium futuro |
| **Próximo paso** | Refinar arquitectura técnica + crear guía de uso + seleccionar testers |

---

## 📝 NOTAS FINALES

- La entrevista es **DINÁMICA:** la IA solo pregunta lo que falta
- Los documentos son **100% editables:** docente decide qué cambiar
- La seguridad es **PRIORITARIA desde V1:** prototipo pero seguro
- El modelo es **ESCALABLE:** freemium permite crecimiento futuro
- El feedback es **CRÍTICO:** testing con docentes reales es esencial

**Estado:** Especificación completa y lista para desarrollo.

---

*Documento generado: 9 de Julio, 2024*  
*Proyecto: PlanificaTool V1*
