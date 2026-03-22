# 📜 Constitution — BereNails Studio
> Documento rector del proyecto. Todo desarrollo, decisión técnica y generación de código por agentes de IA debe respetar estos principios sin excepción.

**Versión:** 3.3  
**Última actualización:** 22 de marzo, 2026  
**Autor:** Sistema de documentación SDD

---

## 1. Identidad del Proyecto

| Campo                     | Valor                                           |
|---------------------------|-------------------------------------------------|
| **Nombre**                | BereNails Studio                                |
| **Tipo**                  | Plataforma web: Sitio público + Panel Admin     |
| **País de operación**     | México                                          |
| **Idioma de la interfaz** | Español (es-MX)                                 |
| **Moneda**                | Peso Mexicano (MXN)                             |
| **Alcance**               | Una sola sucursal. Sin escalabilidad multi-sede.|
| **Audiencia pública**     | Clientas del salón (móvil y escritorio)         |
| **Audiencia admin**       | Propietaria del salón (móvil y tablet)          |

---

## 2. Tres Pilares Fundamentales

> ⚠️ Estos tres pilares son principios rectores de igual jerarquía. Ninguna decisión técnica o de diseño puede sacrificar uno en favor de otro. Son **inamovibles**.

---

### 🔒 Pilar 1 — Seguridad

La seguridad no es una característica adicional; es la base del sistema. Se aplica en todas las capas.

**Autenticación**
- El panel admin solo es accesible mediante Supabase Auth con email + contraseña.
- Sesión gestionada con `localStorage`. Se invalida al hacer logout explícito.
- No existe registro público de nuevas cuentas. Solo la cuenta de la propietaria existe.
- La contraseña debe cumplir: mínimo 8 caracteres, una mayúscula, una minúscula, un número.

**Autorización**
- Row Level Security (RLS) habilitado en todas las tablas de Supabase.
- Solo la propietaria autenticada puede leer/escribir `promotions`.
- `appointments` es de solo lectura para usuarios no autenticados.
- Escritura en `appointments` solo para agregar nuevas solicitudes (INSERT).
- Actualización y borrado de `appointments` solo para la propietaria autenticada.

**Validación de datos**
- Toda entrada de usuario (formularios públicos y privados) debe ser sanitizada y validada antes de enviarse a Supabase.
- No confiar en validaciones del cliente. Las reglas RLS en el servidor son la última línea de defensa.

**Almacenamiento de imágenes**
- Las imágenes en Supabase Storage solo pueden ser subidas por la propietaria autenticada.
- La carpeta `promotions/` tiene política de Storage que solo permite escritura autenticada.
- Las imágenes son accesibles públicamente para lectura (visualización en web pública).

**Logs y monitoreo**
- No se guardan datos sensibles en logs del navegador (consola).
- Los errores de Supabase no deben exponer información de la base de datos al usuario final.

---

### 💸 Pilar 2 — Costo cero

El sistema debe funcionar indefinidamente en el plan gratuito sin incurrir en costos de infraestructura.

**Stack con planes free permanentes**

| Componente         | Servicio              | Plan          | Límites incluidos                              |
|--------------------|-----------------------|---------------|------------------------------------------------|
| Base de datos      | Supabase              | Free          | 500 MB de BD, 1 GB de Storage, 50k usuarios   |
| Frontend hosting   | Cloudflare Pages      | Free          | Hosting ilimitado, SSL gratis, 500 builds/mes  |
| Autenticación      | Supabase Auth         | Free          | Incluido en Supabase                           |
| Imágenes           | Supabase Storage      | Free          | 1 GB (compresión en cliente antes de subir)    |

**Total: 0 USD/mes**

**Límites operacionales asumidos**
- Máximo 100 citas/mes (muy por debajo de 50k usuarios de Supabase)
- Máximo 20 promociones activas (cada una ~100 KB de imagen = 2 MB total)
- 1 usuario admin (propietaria)

**Estrategias de optimización**
- Compresión de imágenes en el navegador antes de subir (máx. 200 KB por imagen).
- Sin suscripciones Realtime redundantes: una sola suscripción para todas las citas.
- Sin dependencias de servicios de pago en el código.

---

### ✨ Pilar 3 — Imagen profesional y usabilidad

La plataforma debe verse y sentirse como un negocio establecido, no como un proyecto amateur. La usabilidad es crítica para que la propietaria adopte el sistema.

**Diseño visual**
- Paleta de colores profesional: Rosa (#E91E63), Dorado (#FFD700), Negro (#1A1A1A), Blanco (#FFFFFF).
- Tipografía moderna y legible: Inter o similar de Google Fonts.
- Sin elementos de diseño "genéricos de IA": gradientes excesivos, neomorfismo forzado, o patrones de marca de agua.
- Todas las ilustraciones o iconos deben ser de fuentes libres (Lucide Icons, Heroicons).

**Experiencia de usuario (UX)**
- Tanto la web pública como el panel admin deben ser responsive con diseño mobile-first (la propietaria administra desde su celular o tablet).
- Formularios con validación en tiempo real: errores claros, sin jerga técnica.
- Mensajes de éxito/error en español, amigables: "Cita solicitada con éxito" en vez de "Record inserted".
- Estados de carga visibles: spinners, barras de progreso, no dejar la UI congelada.
- Sin dead ends: siempre debe haber una acción clara después de completar un flujo.
- Navegación táctil optimizada: botones y áreas de clic con tamaño mínimo de 44x44px (recomendación de accesibilidad móvil).
- Menús y controles accesibles con una sola mano en dispositivos móviles.

**Accesibilidad básica**
- Contraste WCAG AA mínimo en todos los textos.
- Inputs con labels correctos para screen readers.
- Botones con estados hover/focus visibles.

**Performance**
- Tiempo de carga inicial <3 segundos en conexión 3G.
- Imágenes lazy-loaded cuando sea apropiado.
- Sin dependencias innecesarias que inflen el bundle (mantener <500 KB el JS principal).

---

## 3. Stack Tecnológico

**Frontend**

| Capa                | Tecnología           | Justificación                                  |
|---------------------|----------------------|------------------------------------------------|
| Framework           | React 18 + Vite 5 + TypeScript | Componentes reutilizables, desarrollo rápido, tipado estricto |
| Enrutamiento        | React Router v6      | Estándar de la industria                       |
| Estado global       | Zustand              | Simple, sin boilerplate                        |
| Estilos             | Tailwind CSS         | Diseño rápido, personalizable, bundle pequeño |
| Iconos              | Lucide React         | Iconos modernos, gratis, tree-shakeable        |
| Formularios         | React Hook Form      | Validación eficiente, menos re-renders         |
| Notificaciones      | React Hot Toast      | Toasts elegantes y ligeros                     |
| Testing             | Vitest               | Rápido, compatible con Vite                    |

**Backend**

| Capa                | Tecnología           | Justificación                                  |
|---------------------|----------------------|------------------------------------------------|
| Base de datos       | Supabase (PostgreSQL)| SQL robusto, RLS integrado, free tier generoso |
| Autenticación       | Supabase Auth        | OAuth y email/password, sin código backend     |
| Almacenamiento      | Supabase Storage     | 1 GB gratis, integrado con Auth                |
| Realtime            | Supabase Realtime    | WebSockets para notificaciones en vivo         |

**Hosting y CI/CD**

| Capa                | Tecnología           | Justificación                                  |
|---------------------|----------------------|------------------------------------------------|
| Hosting             | Cloudflare Pages     | Gratis, rápido, SSL automático                 |
| Repositorio         | GitHub               | Estándar para control de versiones             |
| CI                  | GitHub Actions       | Gratis para repos públicos/privados            |

---

## 4. Estructura de Archivos

```
berenails-studio/
├── public/
│   ├── favicon.ico
│   └── logo.png
├── src/
│   ├── assets/
│   │   └── images/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AppointmentCard.tsx
│   │   │   ├── PromotionForm.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── public/
│   │   │   ├── AppointmentForm.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Gallery.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── PromotionsSection.tsx
│   │   └── shared/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       └── Modal.tsx
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── Appointments.tsx
│   │   │   ├── Login.tsx
│   │   │   └── Promotions.tsx
│   │   └── public/
│   │       ├── Home.tsx
│   │       └── Contact.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useAppointments.ts
│   │   └── usePromotions.ts
│   ├── lib/
│   │   └── supabase.ts
│   ├── store/
│   │   └── authStore.ts
│   ├── types/
│   │   ├── appointments.ts
│   │   ├── promotions.ts
│   │   └── database.ts
│   ├── utils/
│   │   ├── imageCompression.ts
│   │   └── validators.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.js
├── README.md
├── constitution.md
├── spec.md
└── plan.md
```

---

## 5. Reglas para Agentes de IA

Cuando un agente de IA (como Claude, GPT, Copilot) genere código para este proyecto, **debe cumplir todas estas reglas sin excepción**:

### Regla 1: Español en la interfaz
- Todo texto visible al usuario (botones, labels, mensajes) debe estar en español de México.
- Los comentarios en el código pueden estar en inglés, pero los strings de UI siempre en español.

### Regla 2: Tipado estricto
- TypeScript en modo `strict: true`.
- Cero uso de `any`. Preferir `unknown` y type guards si el tipo no es conocido.
- Generar tipos desde la base de datos con Supabase CLI: `supabase gen types typescript`.

### Regla 3: Componentes funcionales
- Solo componentes funcionales con hooks. Cero class components.
- Un componente por archivo.
- Props siempre tipadas con TypeScript interfaces o types.

### Regla 4: Validación defensiva
- Validar props con PropTypes o TypeScript interfaces.
- Validar datos de formularios antes de enviarlos a Supabase.
- Manejar todos los estados de error posibles (red, autenticación, validación).

### Regla 5: Accesibilidad básica
- Labels correctos en inputs (`<label htmlFor="...">`).
- Atributos ARIA donde aplique (`aria-label`, `aria-describedby`).
- Navegación por teclado funcional (tab, enter, escape).

### Regla 6: Performance
- Lazy loading en rutas: `React.lazy()` y `<Suspense>`.
- Imágenes optimizadas: compresión antes de subir, lazy loading con `loading="lazy"`.
- Evitar re-renders innecesarios: `React.memo()`, `useMemo()`, `useCallback()` cuando corresponda.

### Regla 7: Seguridad en cliente
- No hardcodear claves de API en el código (usar `.env` y Vite env vars).
- No confiar en validaciones solo del cliente; RLS en Supabase es la fuente de verdad.
- Sanitizar inputs antes de renderizar (XSS prevention).

### Regla 8: Sin dependencias innecesarias
- Antes de agregar un nuevo paquete npm, verificar si existe una solución nativa o con las deps existentes.
- Preferir librerías con tree-shaking (exports por módulo).
- Evitar jQuery, Moment.js (usar date-fns o nativo), y otras libs legacy.

### Regla 9: Estructura consistente
- Carpetas por dominio: `components/admin`, `components/public`, `components/shared`.
- Nombres de archivos en PascalCase para componentes: `AppointmentCard.tsx`.
- Nombres de archivos en camelCase para utils y hooks: `useAuth.ts`, `imageCompression.ts`.

### Regla 10: Estados de UI explícitos
- Siempre manejar: `loading`, `error`, `empty`, `success`.
- No dejar la UI en blanco mientras carga: mostrar skeleton o spinner.
- Mensajes de error amigables, no técnicos.

### Regla 11: Commits semánticos
- Mensajes de commit con formato Conventional Commits: `feat:`, `fix:`, `docs:`, `refactor:`.
- Ejemplo: `feat(admin): add promotion deletion with confirmation modal`.

### Regla 12: Testing básico
- Test de renderizado para cada componente crítico.
- Test de integración para flujos completos (crear cita, editar promoción).
- Coverage mínimo: 60% en componentes core.

### Regla 13: Comentarios solo cuando agregan valor
- No comentar lo obvio: `// Render button` es ruido.
- Comentar el porqué, no el qué: `// Disable button during API call to prevent double submission`.

### Regla 14: Manejo de errores de Supabase
- Siempre verificar `error` en respuestas de Supabase.
- Loggear errores a consola en desarrollo, pero no en producción.
- Mostrar mensajes de error genéricos al usuario, no stacktraces.

### Regla 15: Responsividad
- Mobile-first en CSS para toda la plataforma: diseñar para móvil primero, luego tablet y desktop.
- Breakpoints de Tailwind: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px).
- Probar en viewport mínimo de 320px (iPhone SE) y tablet de 768px (iPad).
- El panel admin debe ser completamente funcional en móvil y tablet sin perder usabilidad.

### Regla 16: Consistencia visual
- Usar variables de Tailwind para colores: `bg-pink-600`, `text-yellow-500`.
- No colores hardcodeados en hex a menos que sea absolutamente necesario.
- Espaciado consistente: múltiplos de 4px (Tailwind: `p-2`, `m-4`, etc.).

### Regla 17: Sin console.log en producción
- Usar `console.log` en desarrollo está bien.
- Remover todos los logs antes de hacer merge a `main`.
- Considerar usar un logger que se desactive automáticamente en build de producción.

### Regla 18: RLS siempre activo
- Nunca deshabilitar RLS en Supabase por conveniencia.
- Si una query falla por permisos, arreglar las políticas RLS, no deshabilitar seguridad.

### Regla 19: Versionado semántico
- El proyecto sigue semver: `MAJOR.MINOR.PATCH`.
- Incrementar `MINOR` al agregar features.
- Incrementar `PATCH` al arreglar bugs.
- Incrementar `MAJOR` si hay breaking changes (muy raro en este proyecto).

---

## 6. Historial de Cambios

| Versión | Fecha          | Cambios                                              |
|---------|----------------|------------------------------------------------------|
| 3.3     | 22 Mar 2026    | Cambio de estrategia UX: Panel admin ahora es mobile-first (administración desde celular/tablet). Actualizada audiencia admin, sección de UX en Pilar 3, y Regla 15 de responsividad. |
| 3.2     | 14 Mar 2026    | Migración a TypeScript, Vite 5, Vitest. Árbol de archivos actualizado con extensiones .ts/.tsx. Nuevas reglas 2 (tipado estricto) y generación de tipos desde Supabase. |
| 3.1     | 10 Mar 2026    | Migración de Firebase a Supabase. Actualización de stack completo, costos, y arquitectura. |
| 3.0     | 8 Mar 2026     | Refuerzo de los 3 pilares: seguridad, costo cero, profesionalismo. Reglas de IA expandidas. |
| 2.0     | 5 Mar 2026     | Estructura de archivos completa y stack tecnológico definido. |
| 1.0     | 4 Mar 2026     | Documento inicial con identidad del proyecto.        |

---

## 7. Licencia

Este documento es propiedad de BereNails Studio. No debe modificarse sin aprobación de la propietaria del proyecto.
