# 💅 BereNails Studio

Plataforma web para un salón de uñas en México. Compuesta de una **página pública** para clientas y un **panel de administración** para la propietaria.

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React + TypeScript + Vite |
| Estilos | Tailwind CSS + Google Fonts |
| Auth & DB | Supabase (plan gratuito) |
| Hosting | Cloudflare Pages |
| CI/CD | GitHub Actions |
| Versionado | Release Please (Conventional Commits) |

---

## Pilares del proyecto

**🔒 Seguridad** — Supabase Auth protege el panel admin. Row Level Security valida cada dato en el servidor. Las credenciales viven en `.env.local` y nunca en el código.

**💸 Costo cero** — Todo el stack opera en planes gratuitos. Supabase Free tier, Cloudflare Pages Free, GitHub Actions Free.

**✨ Imagen profesional** — Tipografía Cormorant Garamond + Jost, paleta crema con acento rosa dorado `#c9a48a`, diseño mobile-first, animaciones sutiles.

---

## Flujo de trabajo

```
[Nueva feature]
      │
      ▼
git checkout -b feat/mi-feature
      │
      ▼
[Commits con Conventional Commits]
      │
      ▼
git push origin feat/mi-feature
      │
      ▼
[Abrir Pull Request → main]
      │
      ├─▶ CI: lint + type-check + tests + build
      └─▶ Cloudflare Pages: preview deploy automático
                │
                ▼
        URL de preview comentada en el PR
                │
                ▼
      [Code review + merge a main]
                │
                ▼
      Release Please crea PR de release
                │
                ▼
      [Merge del PR de release]
                │
                ├─▶ Tag vX.Y.Z + GitHub Release + CHANGELOG
                └─▶ Deploy automático a producción
```

### Bumps de versión automáticos

| Tipo de commit | Efecto |
|----------------|--------|
| `feat: nueva función` | minor `0.x.0` |
| `fix: corrección` | patch `0.0.x` |
| `feat!:` o `BREAKING CHANGE:` | major `x.0.0` |
| `docs:`, `chore:`, `refactor:` | sin bump |

---

## Setup inicial

### 1. Clonar e instalar

```bash
git clone https://github.com/tu-usuario/bere-nails-studio.git
cd bere-nails-studio
npm install
cp .env.example .env.local
# Editar .env.local con tus credenciales de Supabase
```

### 2. Secretos en GitHub

**Settings → Secrets and variables → Actions → New repository secret**

```
CLOUDFLARE_API_TOKEN      # API Token con permisos de Cloudflare Pages
CLOUDFLARE_ACCOUNT_ID     # ID de tu cuenta Cloudflare
VITE_SUPABASE_URL         # URL de tu proyecto Supabase
VITE_SUPABASE_ANON_KEY    # Clave anon pública de Supabase
```

### 3. Crear proyecto en Cloudflare Pages

```bash
npm install -g wrangler
wrangler login
wrangler pages project create bere-nails-studio
```

### 4. Levantar en local

```bash
npm run dev       # http://localhost:5173
npm run build     # Build de producción → dist/
npm run preview   # Preview local del build
```

---

## Scripts disponibles

```bash
npm run dev            # Desarrollo
npm run build          # Build de producción
npm run preview        # Preview local
npm run lint           # ESLint
npm run lint:fix       # ESLint con autofix
npm run format         # Prettier
npm run format:check   # Prettier (solo verificar)
npm run test           # Tests con Vitest
npm run test:watch     # Tests en modo watch
npm run test:coverage  # Tests con cobertura
npm run type-check     # TypeScript sin emitir
```

---

## Estructura del proyecto

```
bere-nails-studio/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                # Lint + tests + build
│   │   ├── release-please.yml    # Versionado automático
│   │   └── deploy.yml            # Deploy a Cloudflare Pages
│   └── pull_request_template.md
├── src/
│   ├── lib/
│   │   └── supabase.ts           # Cliente de Supabase
│   └── index.css                 # Estilos globales + Tailwind
├── .env.example
├── .gitignore
├── .release-please-manifest.json
├── index.html                    # Google Fonts aquí
├── package.json
├── postcss.config.js
├── release-please-config.json
├── tailwind.config.ts            # Design tokens de BereNails
├── tsconfig.json
├── vite.config.ts
└── wrangler.toml
```

---

## Convenciones de commits

```bash
feat: agregar formulario de solicitud de cita
fix: corregir validación de teléfono
feat(admin): añadir vista de calendario
feat!: cambiar estructura de datos de clientes
docs: actualizar instrucciones de setup
chore: actualizar dependencias
```

---

## Obtener credenciales de Supabase

1. Ir a [console.supabase.com](https://console.supabase.com)
2. Crear proyecto → elegir región más cercana a México (us-east-1)
3. **Settings → API** → copiar `Project URL` y `anon public` key
4. Pegar en `.env.local`

---

*BereNails Studio — Hecho con 💅 en México*
