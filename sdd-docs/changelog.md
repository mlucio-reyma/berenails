# 📝 Changelog - BereNails Studio

Todos los cambios notables del proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

---

## [No Publicado]

### Agregado
- **plan.md v1.0** - Plan completo de implementación en 3 fases
  - Fase 1: Landing estático con placeholder de promociones
  - Fase 2: Sistema de citas + CitasViewer temporal
  - Fase 3: Panel admin mobile-first completo
  - Estrategia de releases incrementales
  - Comandos copy-paste ready
  - Checkpoints de verificación por fase
  - Sección de FAQs

### Cambiado
- Panel admin actualizado a diseño mobile-first (de desktop-first a mobile/tablet-first)
- Layout del panel admin: implementado Bottom Navigation para móvil y tablet
- Criterios de UX actualizados para incluir optimización táctil (44x44px mínimo)
- Audiencia admin actualizada en documentación: de "web desktop" a "móvil y tablet"

### Agregado
- Especificación de Bottom Navigation con 4 tabs principales
- Guías de navegación táctil optimizada para una sola mano
- Breakpoint específico para mostrar Sidebar solo en desktop (≥1024px)

---

## [0.1.0] - 2026-03-14

### Agregado
- Migración completa a TypeScript + Vite 5
- Configuración de Vitest para testing
- Tipos generados desde Supabase CLI
- Estructura de carpetas `src/types/` para definiciones de TypeScript
- Archivos de configuración: `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`

### Cambiado
- Todas las extensiones `.jsx` → `.tsx`
- Todas las extensiones `.js` → `.ts`
- Stack frontend actualizado de "React + Vite" a "React 18 + Vite 5 + TypeScript"

---

## [0.0.2] - 2026-03-10

### Agregado
- Migración de Firebase a Supabase como backend
- Configuración de Supabase Auth para login de admin
- Configuración de Supabase Storage para imágenes de promociones
- Políticas RLS para tablas `appointments` y `promotions`
- Integración de Supabase Realtime para notificaciones

### Cambiado
- Base de datos de Firestore a PostgreSQL (Supabase)
- Autenticación de Firebase Auth a Supabase Auth
- Storage de Firebase Storage a Supabase Storage

### Eliminado
- Todas las dependencias de Firebase (`firebase`, `@firebase/auth`, etc.)

---

## [0.0.1] - 2026-03-04

### Agregado
- Definición inicial del proyecto BereNails Studio
- Identidad de marca: nombre, colores (rosa y dorado), estilo minimalista moderno
- Documento `constitution.md` v1.0 con identidad del proyecto
- Documento `spec.md` v1.0 con especificaciones técnicas básicas
- Stack tecnológico definido: React + Firebase + Tailwind CSS
- Tres pilares fundamentales: Seguridad, Costo $0, Profesionalismo

---

## Categorías de cambios

- **Agregado** - para nuevas funcionalidades
- **Cambiado** - para cambios en funcionalidades existentes
- **Deprecado** - para funcionalidades que serán eliminadas pronto
- **Eliminado** - para funcionalidades eliminadas
- **Arreglado** - para corrección de bugs
- **Seguridad** - en caso de vulnerabilidades

---

**Formato de versiones:** `MAJOR.MINOR.PATCH`
- **MAJOR:** Cambios incompatibles con versiones anteriores
- **MINOR:** Nueva funcionalidad compatible con versiones anteriores
- **PATCH:** Correcciones de bugs compatibles con versiones anteriores
