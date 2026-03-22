# 📚 Spec-Driven Development (SDD) - BereNails Studio

Esta carpeta contiene toda la documentación de gobernanza del proyecto siguiendo la metodología Spec-Driven Development.

## 📂 Estructura de Documentos

```
sdd-docs/
├── README.md              # Este archivo (índice de documentación)
├── constitution.md        # Documento rector del proyecto (v3.3)
├── spec.md               # Especificaciones técnicas (v2.5)
├── plan.md               # Plan de implementación (próximamente)
└── changelog.md          # Registro de cambios del proyecto
```

---

## 🚨 Cambio Importante en v3.3

### Panel Admin ahora es Mobile-First 📱

**Antes:** El panel admin estaba diseñado para desktop (la propietaria trabajaba desde PC).

**Ahora:** El panel admin está optimizado para móvil y tablet (la propietaria administra desde su celular).

**Impacto en el diseño:**
- ✅ Bottom Navigation en lugar de Sidebar izquierda
- ✅ Áreas táctiles de 44x44px mínimo
- ✅ Navegación con una sola mano
- ✅ Sidebar solo visible en pantallas grandes (≥1024px)

---

## 🎯 ¿Qué es cada documento?

### 📜 constitution.md (v3.3)
**Propósito:** Documento de gobernanza que establece las reglas inmutables del proyecto.

**Cambios en v3.3:**
- Audiencia admin actualizada: "móvil y tablet" en lugar de "web desktop"
- Sección de UX en Pilar 3 actualizada a mobile-first para toda la plataforma
- Regla 15 (Responsividad) expandida con breakpoints específicos y testing en tablet

**Contiene:**
- Identidad del proyecto
- Los 3 pilares fundamentales (Seguridad, Costo $0, Profesionalismo)
- Stack tecnológico oficial
- Estructura de archivos
- 19 reglas para agentes de IA
- Historial de versiones

**Cuándo consultarlo:**
- Antes de agregar cualquier dependencia nueva
- Antes de tomar decisiones de arquitectura
- Al configurar herramientas de IA (Claude, Copilot, etc.)
- Al incorporar nuevos desarrolladores al equipo

---

### 📐 spec.md (v2.5)
**Propósito:** Especificación técnica de TODAS las funcionalidades del sistema.

**Cambios en v2.5:**
- Layout del panel admin completamente rediseñado para mobile-first
- Especificación detallada de Bottom Navigation con 4 tabs
- Criterios de aceptación de UI/UX actualizados
- Guías de navegación táctil optimizada

**Contiene:**
- Descripción de cada pantalla (pública y admin)
- Modelo de datos completo (Supabase)
- Estados y validaciones
- 42 criterios de aceptación verificables (actualizados)
- Prioridades de desarrollo

**Cuándo consultarlo:**
- Al implementar cualquier feature nueva
- Al hacer code review
- Al escribir tests
- Al documentar APIs o componentes

---

### 📋 plan.md (próximamente)
**Propósito:** Plan de implementación paso a paso.

**Contendrá:**
- Orden de construcción de componentes
- Dependencias entre módulos
- Comandos de setup inicial
- Checklist de cada fase
- Estimaciones de tiempo

---

### 📝 changelog.md
**Propósito:** Registro de todos los cambios significativos del proyecto.

**Formato:** Conventional Changelog (feat, fix, docs, refactor, etc.)

**Último cambio:** Panel admin cambiado a mobile-first (v3.3 / v2.5)

---

## 🚀 Cómo usar estos documentos

### Para desarrolladores humanos:
1. Lee `constitution.md` primero (15 min) - **IMPORTANTE: Leer v3.3 para cambios mobile-first**
2. Lee `spec.md` para entender qué construir (30 min) - **IMPORTANTE: Layout actualizado en v2.5**
3. Consulta `plan.md` para saber por dónde empezar
4. Actualiza `changelog.md` con cada PR significativo

### Para agentes de IA (Claude, Copilot, etc.):
Incluye este contexto en tus prompts:

```
Lee los documentos en /sdd-docs/:
- constitution.md v3.3 (reglas de desarrollo + MOBILE-FIRST para admin)
- spec.md v2.5 (funcionalidades + Bottom Navigation)

IMPORTANTE: El panel admin ahora es mobile-first con Bottom Navigation.
Luego genera código siguiendo estrictamente estas especificaciones.
```

---

## 📌 Reglas de Oro

1. **Nunca modifiques `constitution.md` sin aprobación**
   - Es el documento rector del proyecto
   - Cambios aquí afectan toda la arquitectura

2. **Mantén `spec.md` actualizado**
   - Si agregas una feature, documéntala aquí primero
   - Si cambias el comportamiento, actualiza la spec

3. **`plan.md` es flexible**
   - Puedes ajustar el orden de implementación
   - Marca checkboxes conforme completas tareas

4. **`changelog.md` es tu registro histórico**
   - Escribe en pasado: "Agregado login de admin"
   - Incluye enlaces a PRs cuando sea posible

---

## 🔄 Flujo de trabajo recomendado

```
1. Consultar spec.md v2.5 → ¿Qué feature voy a construir? (revisar Bottom Navigation)
2. Consultar constitution.md v3.3 → ¿Cómo debo construirla? (mobile-first)
3. Consultar plan.md → ¿Qué orden seguir?
4. Desarrollar feature (diseño mobile-first, áreas táctiles 44x44px)
5. Verificar criterios de aceptación en spec.md
6. Actualizar changelog.md
7. Commit con mensaje semántico (feat:, fix:, etc.)
```

---

## 📱 Guía rápida: Diferencias Mobile-First

### Antes (v3.2 / v2.4):
- Panel admin: desktop-first
- Navegación: Sidebar izquierda fija
- Target: PC de la propietaria

### Ahora (v3.3 / v2.5):
- Panel admin: **mobile-first**
- Navegación: **Bottom Navigation** (móvil/tablet) + Sidebar (desktop)
- Target: **Celular y tablet** de la propietaria
- Áreas táctiles: mínimo **44x44px**
- Navegación: accesible con **una sola mano**

---

## 📞 Mantenimiento

**Frecuencia de actualización:**
- `constitution.md`: Raramente (solo cambios de arquitectura mayores) - **v3.3 actualizado: 22 marzo 2026**
- `spec.md`: Con cada nueva feature o cambio de comportamiento - **v2.5 actualizado: 22 marzo 2026**
- `plan.md`: Semanalmente (marcar progreso)
- `changelog.md`: Con cada commit significativo

**Versionado:**
- Los documentos usan versionado semántico (x.y)
- Incrementa el número menor (y) con cada actualización
- Incrementa el número mayor (x) con cambios breaking

---

**Última actualización:** 22 de marzo, 2026  
**Versiones actuales:** constitution.md v3.3 | spec.md v2.5
