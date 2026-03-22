# 📐 Spec — BereNails Studio
> Especificación técnica del proyecto. Define **qué** construir, **cómo** funciona cada pantalla, y **qué** criterios validan el éxito.

**Versión:** 2.5  
**Última actualización:** 22 de marzo, 2026  
**Basado en:** constitution.md v3.3

---

## Registro de Cambios

| Versión | Fecha        | Cambios                                                                 |
|---------|--------------|-------------------------------------------------------------------------|
| 2.5     | 22 Mar 2026  | Panel admin cambiado a mobile-first: Layout actualizado con bottom navigation, optimización táctil, sección de UI/UX y criterios de aceptación actualizados. |
| 2.4     | 14 Mar 2026  | TypeScript: Agregada sección de criterios de aceptación, bloque de código Realtime actualizado a TypeScript, referencia a Vite 5 y Vitest. |
| 2.3     | 10 Mar 2026  | Migración de Firebase a Supabase: modelo de datos, Realtime, Storage, Auth. |
| 2.2     | 9 Mar 2026   | Agregado badge numérico en Tab Nav con cantidad de citas pendientes.    |
| 2.1     | 8 Mar 2026   | Especificación completa de estados de cita y validaciones.              |
| 2.0     | 6 Mar 2026   | Primera versión oficial post-constitution.                              |

---

## 1. Visión General

**BereNails Studio** es una plataforma web dividida en dos aplicaciones:

1. **Sitio Público** — Landing page para clientas. Muestra servicios, promociones, galería, y permite solicitar citas.
2. **Panel Admin** — Dashboard privado para la propietaria. Gestiona promociones y citas.

**Stack:** React 18 + TypeScript + Vite 5 + Tailwind CSS + Supabase (PostgreSQL + Auth + Storage + Realtime)

**Objetivo de negocio:** Profesionalizar la imagen del salón y centralizar la gestión de citas en una plataforma propia (sin depender solo de WhatsApp/Instagram).

---

## 2. Sitio Público

### 2.1 Pantallas

#### 🏠 Home (`/`)

**Secciones (en orden):**

1. **Hero**
   - Imagen destacada del salón o trabajo destacado.
   - Título: "Transforma tu look con BereNails Studio".
   - CTA: "Solicita tu cita" → scroll a formulario de citas.

2. **Servicios**
   - Grid de 4 servicios principales: Manicure, Pedicure, Uñas Acrílicas, Extensión de Pestañas.
   - Cada servicio: ícono, nombre, descripción corta (2 líneas).

3. **Promociones**
   - Carrusel horizontal con las promociones activas (traídas desde Supabase).
   - Cada promoción: imagen, título, descripción, fecha de expiración.
   - Si no hay promociones: mensaje "No hay promociones activas en este momento".

4. **Galería**
   - Grid de 6 imágenes fijas (hardcodeadas en el código por ahora).
   - Lightbox al hacer clic en una imagen (opcional, nice-to-have).

5. **Formulario de Citas**
   - Campos:
     - Nombre completo (text, requerido)
     - Teléfono (tel, requerido, formato: 10 dígitos sin espacios)
     - Servicio (select, opciones: Manicure, Pedicure, Uñas Acrílicas, Extensión de Pestañas, Otro)
     - Fecha preferida (date, requerido, no permitir fechas pasadas)
     - Hora preferida (time, requerido, rango 9:00-18:00)
     - Comentarios adicionales (textarea, opcional)
   - Validación en tiempo real (errores visibles bajo cada input).
   - Al enviar: crear registro en tabla `appointments` con status `pending`.
   - Mensaje de éxito: "¡Cita solicitada con éxito! Nos pondremos en contacto contigo pronto".
   - Limpiar formulario después de envío exitoso.

6. **Footer**
   - Información de contacto: teléfono, email, dirección.
   - Enlaces a redes sociales (Instagram, Facebook).
   - Copyright: "© 2026 BereNails Studio. Todos los derechos reservados."

#### 📞 Contacto (`/contacto`)

- Información de contacto duplicada del Footer.
- Mapa embebido de Google Maps con ubicación del salón (opcional, nice-to-have).

---

### 2.2 Navegación

- **Navbar fija** (sticky top) con logo y enlaces: Inicio, Contacto.
- En móvil: menú hamburguesa.
- Sin login visible en sitio público.

---

## 3. Panel Admin

### 3.1 Autenticación

**Pantalla de Login (`/admin/login`)**

- Campos: Email, Contraseña.
- Botón: "Iniciar sesión".
- Validación:
  - Email en formato válido.
  - Contraseña no vacía.
- Integración con Supabase Auth (`signInWithPassword`).
- Si error: mensaje "Credenciales incorrectas".
- Si éxito: redirigir a `/admin/dashboard`.
- **Persistencia de sesión:** usar `browserLocalPersistence` de Supabase.
- **Logout:** botón "Cerrar sesión" en Sidebar → `signOut()` → redirigir a `/admin/login`.

**Protección de rutas:**
- Todas las rutas `/admin/*` (excepto `/admin/login`) requieren autenticación.
- Si no autenticado: redirigir automáticamente a `/admin/login`.

---

### 3.2 Layout

**Diseño mobile-first (optimizado para celular y tablet):**

**Bottom Navigation (móvil y tablet):**
- Barra de navegación fija en la parte inferior de la pantalla
- 4 tabs principales con iconos y labels:
  - 📊 Dashboard
  - 📅 Citas (con badge numérico de pendientes)
  - 🎁 Promociones
  - 👤 Perfil / Cerrar sesión
- Tab activa resaltada con color rosa (#E91E63)
- Área táctil mínima: 44x44px por tab
- Siempre visible para navegación rápida

**Header superior:**
- Logo de BereNails Studio (centrado o izquierda)
- Nombre de la sección actual
- Ícono de notificaciones (opcional, para futuras versiones)

**Sidebar izquierda (solo en desktop/tablet landscape):**
- Visible solo en pantallas ≥1024px (breakpoint `lg:`)
- Logo de BereNails Studio
- Navegación vertical idéntica al Bottom Navigation
- Resaltar ruta activa
- Botón de cerrar sesión al final

**Contenido principal:**
- Área de trabajo para cada sección (Dashboard, Citas, Promociones)
- Padding adecuado para no interferir con Bottom Navigation
- Scroll vertical suave

---

### 3.3 Pantallas

#### 📊 Dashboard (`/admin/dashboard`)

**Métricas en tarjetas:**
1. **Citas pendientes** (status = `pending`): número total.
2. **Citas confirmadas hoy** (status = `confirmed`, fecha = hoy): número total.
3. **Promociones activas** (fecha de expiración >= hoy): número total.

**Últimas 5 citas:**
- Lista de las 5 citas más recientes (ordenadas por `created_at` descendente).
- Cada cita: nombre del cliente, servicio, fecha/hora, status.
- Botón "Ver todas" → redirige a `/admin/appointments`.

---

#### 📅 Citas (`/admin/appointments`)

**Vista principal:**
- Tabla con todas las citas (paginada, 20 por página).
- Columnas: ID, Nombre, Teléfono, Servicio, Fecha, Hora, Status, Acciones.
- Filtros (opcional, nice-to-have):
  - Por status: Todas, Pendientes, Confirmadas, Canceladas, Completadas.
  - Por rango de fechas.

**Estados de cita:**
- `pending` → Pendiente (amarillo)
- `confirmed` → Confirmada (verde)
- `cancelled` → Cancelada (rojo)
- `completed` → Completada (azul)

**Acciones por cita:**
- **Confirmar:** cambiar status de `pending` a `confirmed`.
- **Cancelar:** cambiar status a `cancelled`.
- **Marcar como completada:** cambiar status a `completed`.
- **Editar:** abrir modal con campos editables (nombre, teléfono, servicio, fecha, hora, comentarios).
- **Eliminar:** confirmación "¿Estás segura?" → eliminar registro.

**Notificaciones en tiempo real:**
- Cuando se crea una nueva cita desde el sitio público, aparecer un toast: "Nueva cita de [Nombre]".
- Badge numérico en el Tab Nav (ícono de Citas) mostrando cantidad de citas con status `pending`.
- Implementación con Supabase Realtime:

```typescript
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

export function useAppointmentNotifications() {
  useEffect(() => {
    const channel = supabase
      .channel('appointments-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'appointments',
        },
        (payload) => {
          const newAppointment = payload.new;
          toast.success(`Nueva cita de ${newAppointment.client_name}`);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
}
```

---

#### 🎁 Promociones (`/admin/promotions`)

**Vista principal:**
- Lista/grid de todas las promociones (ordenadas por `created_at` descendente).
- Cada promoción:
  - Imagen (thumbnail)
  - Título
  - Descripción (truncada a 2 líneas)
  - Fecha de expiración
  - Botones: Editar, Eliminar.

**Crear promoción:**
- Botón "Agregar nueva promoción" → abrir modal.
- Campos:
  - Imagen (file input, solo jpg/png, max 5 MB)
  - Título (text, requerido, max 50 caracteres)
  - Descripción (textarea, requerido, max 200 caracteres)
  - Fecha de expiración (date, requerido, no permitir fechas pasadas)
- Al guardar:
  1. Comprimir imagen en cliente (max 200 KB) con canvas.
  2. Subir a Supabase Storage (`promotions/`).
  3. Crear registro en tabla `promotions` con URL de la imagen.
- Validaciones:
  - Imagen requerida.
  - Título no vacío.
  - Descripción no vacía.
  - Fecha de expiración >= hoy.

**Editar promoción:**
- Abrir modal con campos pre-llenados.
- Permitir cambiar imagen (si se sube nueva, eliminar la vieja de Storage).
- Actualizar registro en Supabase.

**Eliminar promoción:**
- Confirmación: "¿Estás segura de eliminar esta promoción?".
- Si confirma: eliminar imagen de Storage y registro de BD.

---

## 4. Modelo de Datos (Supabase)

### Tabla: `appointments`

| Campo            | Tipo         | Restricciones                     | Descripción                              |
|------------------|--------------|-----------------------------------|------------------------------------------|
| `id`             | UUID         | PK, default uuid_generate_v4()    | Identificador único                      |
| `client_name`    | VARCHAR(100) | NOT NULL                          | Nombre completo del cliente              |
| `phone`          | VARCHAR(15)  | NOT NULL                          | Teléfono (10 dígitos)                    |
| `service`        | VARCHAR(100) | NOT NULL                          | Servicio solicitado                      |
| `preferred_date` | DATE         | NOT NULL                          | Fecha preferida                          |
| `preferred_time` | TIME         | NOT NULL                          | Hora preferida                           |
| `comments`       | TEXT         | NULL                              | Comentarios adicionales                  |
| `status`         | VARCHAR(20)  | NOT NULL, default 'pending'       | Estado: pending, confirmed, cancelled, completed |
| `created_at`     | TIMESTAMPTZ  | default now()                     | Fecha de creación                        |
| `updated_at`     | TIMESTAMPTZ  | default now()                     | Última actualización                     |

**Índices:**
- `status` (para filtros rápidos)
- `created_at` (para ordenamiento)

**RLS Policies:**
1. **SELECT (público):** permitir lectura a cualquiera.
2. **INSERT (público):** permitir solo agregar nuevos registros (para formulario público).
3. **UPDATE/DELETE (admin):** solo usuarios autenticados.

---

### Tabla: `promotions`

| Campo         | Tipo         | Restricciones               | Descripción                     |
|---------------|--------------|-----------------------------|---------------------------------|
| `id`          | UUID         | PK, default uuid_generate_v4() | Identificador único        |
| `title`       | VARCHAR(50)  | NOT NULL                    | Título de la promoción          |
| `description` | VARCHAR(200) | NOT NULL                    | Descripción corta               |
| `image_url`   | TEXT         | NOT NULL                    | URL de la imagen en Storage     |
| `expires_at`  | DATE         | NOT NULL                    | Fecha de expiración             |
| `created_at`  | TIMESTAMPTZ  | default now()               | Fecha de creación               |

**RLS Policies:**
1. **SELECT (público):** permitir lectura a cualquiera.
2. **INSERT/UPDATE/DELETE (admin):** solo usuarios autenticados.

---

### Supabase Storage: Bucket `promotions`

**Configuración:**
- Público para lectura.
- Solo usuarios autenticados pueden escribir (subir/eliminar).
- Política de tamaño: max 5 MB por archivo (validación en cliente).
- Formatos permitidos: jpg, jpeg, png.

**Estructura de carpetas:**
```
promotions/
  ├── {uuid-1}.jpg
  ├── {uuid-2}.png
  └── ...
```

Nombrar archivos con UUID para evitar colisiones.

---

## 5. Estados y Validaciones

### Estados de Cita

```
                ┌───────────────────────┐
                │      PENDING          │
                │   (Solicitud nueva)   │
                └───────────────────────┘
                          │
                          │
          ┌───────────────┼───────────────┐
          │                               │
          ▼                               ▼
┌─────────────────┐           ┌─────────────────┐
│   CONFIRMED     │           │   CANCELLED     │
│ (Admin confirma)│           │ (Admin cancela) │
└─────────────────┘           └─────────────────┘
          │
          │
          ▼
┌─────────────────┐
│   COMPLETED     │
│ (Trabajo hecho) │
└─────────────────┘
```

**Reglas:**
- Solo `pending` → `confirmed` o `cancelled`.
- Solo `confirmed` → `completed`.
- No se puede volver atrás (`completed` es estado terminal).

---

### Validaciones de Formularios

#### Formulario de Citas (Público)

| Campo              | Validación                                                   | Mensaje de Error                              |
|--------------------|--------------------------------------------------------------|-----------------------------------------------|
| Nombre             | Requerido, min 3 caracteres                                  | "Ingresa tu nombre completo"                  |
| Teléfono           | Requerido, 10 dígitos exactos                                | "El teléfono debe tener 10 dígitos"           |
| Servicio           | Requerido                                                    | "Selecciona un servicio"                      |
| Fecha              | Requerida, >= hoy                                            | "Selecciona una fecha válida"                 |
| Hora               | Requerida, entre 9:00 y 18:00                                | "El horario debe ser entre 9:00 y 18:00"      |

#### Formulario de Promociones (Admin)

| Campo        | Validación                                                   | Mensaje de Error                              |
|--------------|--------------------------------------------------------------|-----------------------------------------------|
| Imagen       | Requerida, jpg/png, max 5 MB                                 | "Sube una imagen válida (JPG/PNG, max 5 MB)"  |
| Título       | Requerido, max 50 caracteres                                 | "El título no puede exceder 50 caracteres"    |
| Descripción  | Requerida, max 200 caracteres                                | "La descripción no puede exceder 200 caracteres" |
| Expiración   | Requerida, >= hoy                                            | "La fecha de expiración no puede ser pasada"  |

---

## 6. Criterios de Aceptación

El proyecto se considera **completo** cuando se cumplen todos estos checkboxes:

### ✅ Funcionalidad Core

- [ ] El sitio público es accesible sin login y muestra todas las secciones (Hero, Servicios, Promociones, Galería, Formulario, Footer)
- [ ] El formulario de citas crea registros en Supabase con status `pending` y muestra mensaje de éxito
- [ ] La sección de Promociones carga dinámicamente desde Supabase y muestra "No hay promociones" cuando la tabla está vacía
- [ ] El login de admin funciona con email/password de Supabase Auth y redirige al dashboard
- [ ] Las rutas `/admin/*` están protegidas y redirigen a login si no hay sesión activa

### 🔐 Seguridad

- [ ] RLS está habilitado en `appointments` y `promotions` con las políticas correctas
- [ ] Solo usuarios autenticados pueden modificar promociones y cambiar status de citas
- [ ] Supabase Storage bucket `promotions` solo permite escritura autenticada
- [ ] No hay API keys hardcodeadas en el código (solo en `.env`)
- [ ] Las validaciones del cliente están duplicadas en las políticas RLS del servidor

### 🎨 UI/UX

- [ ] Toda la plataforma (sitio público y panel admin) es responsive con diseño mobile-first
- [ ] El panel admin funciona perfectamente en móvil y tablet con Bottom Navigation
- [ ] Todos los botones y áreas táctiles tienen mínimo 44x44px para facilitar el uso en dispositivos móviles
- [ ] Todos los formularios muestran validación en tiempo real con mensajes de error en español
- [ ] Los estados de carga son visibles (spinners, skeletons, no dejar UI congelada)
- [ ] Los toasts de éxito/error aparecen y desaparecen automáticamente (React Hot Toast)
- [ ] La navegación es accesible con una sola mano en dispositivos móviles

### 🔔 Notificaciones Realtime

- [ ] Las citas nuevas disparan un toast en el panel admin en tiempo real (Supabase Realtime)
- [ ] El badge numérico en el Tab Nav de Citas muestra la cantidad de citas `pending`
- [ ] Solo hay una suscripción Realtime activa (no duplicadas) con cleanup en `useEffect`

### 🖼️ Gestión de Imágenes

- [ ] Las imágenes de promociones se comprimen en cliente antes de subir (max 200 KB)
- [ ] Al editar una promoción, la imagen vieja se elimina de Storage si se sube una nueva
- [ ] Al eliminar una promoción, su imagen se elimina de Storage

### 💸 Costo cero

- [ ] Solo servicios del plan Free de Supabase y Cloudflare Pages
- [ ] Todas las suscripciones Realtime tienen `.unsubscribe()` en cleanup de `useEffect`
- [ ] Imágenes comprimidas con canvas antes de subir a Supabase Storage
- [ ] No hay dependencias de pago en `package.json`
- [ ] El badge del Tab Nav comparte la suscripción Realtime de citas (no crea una extra)

### 🔷 TypeScript

- [ ] Todos los archivos `.tsx`/`.ts` pasan `tsc --noEmit` sin errores
- [ ] Modo `strict: true` activo en `tsconfig.json`
- [ ] Cero uso de `any` en todo el código
- [ ] Tipos de base de datos generados desde Supabase: `supabase gen types typescript`
- [ ] Props de componentes tipadas con interfaces/types de TypeScript

---

## 7. Out of Scope (No incluido en MVP)

Estas funcionalidades NO están en el alcance inicial, pero pueden agregarse en futuras versiones:

- Envío automático de emails/SMS de confirmación de cita.
- Sistema de recordatorios (24 horas antes de la cita).
- Integración con calendario (Google Calendar, iCal).
- Pasarela de pagos para reservar con anticipo.
- Multi-idioma (inglés, etc.).
- PWA (Progressive Web App).
- App móvil nativa.
- Multi-sucursal.
- Dashboard de analytics (ingresos, citas por mes, etc.).
- Sistema de reseñas/calificaciones.

---

## 8. Prioridades de Desarrollo

Si hay restricciones de tiempo, construir en este orden:

1. **Autenticación admin** (bloqueante para todo lo demás admin)
2. **Formulario de citas público** (core del negocio)
3. **Panel de citas admin** (gestión básica)
4. **Gestión de promociones admin**
5. **Notificaciones Realtime**
6. **Sección de promociones público**
7. **Dashboard con métricas**
8. **Galería y secciones estáticas**

---

**Fin del documento.**
