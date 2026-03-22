# 📋 Plan de Implementación — BereNails Studio

> Plan de desarrollo en 3 fases con releases incrementales. Cada fase entrega valor al negocio y se puede publicar independientemente.

**Versión:** 1.0  
**Última actualización:** 22 de marzo, 2026  
**Basado en:** constitution.md v3.3 | spec.md v2.5

---

## 🎯 Estrategia de Fases

### Fase 1: Landing Page Estática
**Objetivo:** Presencia web profesional  
**Duración estimada:** 1-2 semanas  
**Entregable:** Sitio público con información del salón

### Fase 2: Sistema de Citas
**Objetivo:** Captura de solicitudes de citas  
**Duración estimada:** 1-2 semanas  
**Entregable:** Formulario funcional + almacenamiento en Supabase

### Fase 3: Panel de Administración
**Objetivo:** Gestión completa de promociones y citas  
**Duración estimada:** 2-3 semanas  
**Entregable:** Dashboard mobile-first con todas las funcionalidades

---

## 📦 Fase 0: Setup Inicial del Proyecto

> **Prerequisitos:** Node.js 18+, Git, cuenta de GitHub, cuenta de Supabase

### 0.1 Crear Proyecto React + TypeScript + Vite

```bash
# Crear proyecto con Vite
npm create vite@latest berenails-studio -- --template react-ts

# Entrar al directorio
cd berenails-studio

# Instalar dependencias
npm install
```

### 0.2 Instalar Dependencias Principales

```bash
# Enrutamiento
npm install react-router-dom

# Estilos
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Iconos
npm install lucide-react

# Formularios
npm install react-hook-form

# Estado global
npm install zustand

# Notificaciones
npm install react-hot-toast

# Supabase (se usará desde Fase 2)
npm install @supabase/supabase-js

# Testing
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

### 0.3 Configurar Tailwind CSS

```bash
# Editar tailwind.config.js
```

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'berenails-pink': '#E91E63',
        'berenails-gold': '#FFD700',
        'berenails-dark': '#1A1A1A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

```bash
# Editar src/index.css
```

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 0.4 Estructura de Carpetas

```bash
# Crear estructura según constitution.md
mkdir -p src/{assets/images,components/{admin,public,shared},pages/{admin,public},hooks,lib,store,types,utils}
```

### 0.5 Configurar Git

```bash
# Inicializar Git
git init

# Crear .gitignore (si no existe)
echo "node_modules
dist
.env
.env.local" > .gitignore

# Primer commit
git add .
git commit -m "feat: initial project setup with vite + react + typescript"

# Conectar con GitHub (sustituir con tu repo)
git remote add origin https://github.com/TU_USUARIO/berenails-studio.git
git branch -M main
git push -u origin main
```

### 0.6 Configurar TypeScript (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 0.7 Configurar Path Aliases en Vite

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

**✅ Checkpoint Fase 0:**
- [ ] Proyecto creado y dependencias instaladas
- [ ] Tailwind configurado con colores de BereNails
- [ ] Estructura de carpetas completa
- [ ] Git inicializado y primer commit hecho
- [ ] TypeScript configurado en modo estricto
- [ ] `npm run dev` funciona sin errores

---

## 🎨 Fase 1: Landing Page Estática

> **Objetivo:** Crear el sitio público con todas las secciones estáticas usando placeholders para imágenes.

**Duración:** 1-2 semanas  
**Publicación:** Cloudflare Pages (producción)

### 1.1 Componentes Shared

#### 1.1.1 Button Component

```bash
# Crear archivo
touch src/components/shared/Button.tsx
```

```typescript
// src/components/shared/Button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-colors min-h-[44px] min-w-[44px]';
  
  const variants = {
    primary: 'bg-berenails-pink text-white hover:bg-pink-700',
    secondary: 'bg-berenails-gold text-berenails-dark hover:bg-yellow-500',
    outline: 'border-2 border-berenails-pink text-berenails-pink hover:bg-pink-50',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
```

### 1.2 Componentes Públicos

#### 1.2.1 Navbar

```typescript
// src/components/public/Navbar.tsx
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="BereNails Studio" className="h-10 w-10" />
            <span className="font-bold text-xl text-berenails-dark">BereNails Studio</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-berenails-dark hover:text-berenails-pink">
              Inicio
            </Link>
            <Link to="/contacto" className="text-berenails-dark hover:text-berenails-pink">
              Contacto
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              to="/"
              className="block px-4 py-2 hover:bg-gray-100 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </Link>
            <Link
              to="/contacto"
              className="block px-4 py-2 hover:bg-gray-100 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Contacto
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
```

#### 1.2.2 Hero Section

```typescript
// src/components/public/Hero.tsx
import { Button } from '@/components/shared/Button';

export function Hero() {
  const scrollToCitas = () => {
    document.getElementById('citas')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-br from-pink-100 to-pink-50">
      {/* Placeholder para imagen de fondo */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold text-berenails-dark mb-6">
          Transforma tu look con <span className="text-berenails-pink">BereNails Studio</span>
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Especialistas en uñas acrílicas, manicure, pedicure y extensión de pestañas
        </p>
        <Button onClick={scrollToCitas} variant="primary" className="text-lg">
          Solicita tu cita
        </Button>
      </div>
    </section>
  );
}
```

#### 1.2.3 Services Section

```typescript
// src/components/public/ServicesSection.tsx
import { Sparkles, Heart, Star, Eye } from 'lucide-react';

const services = [
  {
    icon: Sparkles,
    name: 'Manicure',
    description: 'Cuidado completo de tus uñas con acabado profesional',
  },
  {
    icon: Heart,
    name: 'Pedicure',
    description: 'Tratamiento relajante para tus pies con atención al detalle',
  },
  {
    icon: Star,
    name: 'Uñas Acrílicas',
    description: 'Diseños personalizados que realzan tu estilo único',
  },
  {
    icon: Eye,
    name: 'Extensión de Pestañas',
    description: 'Mirada impactante con pestañas voluminosas y naturales',
  },
];

export function ServicesSection() {
  return (
    <section className="py-16 px-4 bg-white" id="servicios">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-berenails-dark mb-12">
          Nuestros Servicios
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div key={service.name} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <service.icon className="w-16 h-16 mx-auto text-berenails-pink mb-4" />
              <h3 className="text-xl font-semibold text-berenails-dark mb-2">{service.name}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

#### 1.2.4 Gallery Section (con placeholders)

```typescript
// src/components/public/Gallery.tsx
export function Gallery() {
  // Placeholders temporales - reemplazar con imágenes reales
  const images = Array(6).fill('https://placehold.co/400x400/E91E63/FFFFFF?text=BereNails');

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-berenails-dark mb-12">
          Galería de Trabajos
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, index) => (
            <div key={index} className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <img 
                src={img} 
                alt={`Trabajo ${index + 1}`}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

#### 1.2.5 Promotions Section (Placeholder)

```typescript
// src/components/public/PromotionsSection.tsx
import { Gift } from 'lucide-react';

export function PromotionsSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-berenails-dark mb-12">
          Promociones
        </h2>
        
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gradient-to-br from-pink-100 to-pink-50 rounded-lg p-12 border-2 border-dashed border-berenails-pink">
            <Gift className="w-16 h-16 mx-auto text-berenails-pink mb-4" />
            <h3 className="text-2xl font-semibold text-berenails-dark mb-2">
              Próximamente
            </h3>
            <p className="text-gray-600">
              Aquí encontrarás nuestras mejores promociones y ofertas especiales.
              ¡Mantente atenta a nuestras redes sociales!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

#### 1.2.6 Footer

```typescript
// src/components/public/Footer.tsx
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-berenails-dark text-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contacto */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-berenails-gold">Contacto</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Phone size={20} />
              <span>33 1234 5678</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail size={20} />
              <span>contacto@berenails.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin size={20} />
              <span>Guadalajara, Jalisco, México</span>
            </div>
          </div>
        </div>

        {/* Horarios */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-berenails-gold">Horarios</h3>
          <p>Lunes a Sábado: 9:00 AM - 6:00 PM</p>
          <p>Domingo: Cerrado</p>
        </div>

        {/* Redes Sociales */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-berenails-gold">Síguenos</h3>
          <div className="flex space-x-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-berenails-pink transition-colors">
              <Instagram size={28} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-berenails-pink transition-colors">
              <Facebook size={28} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
        <p>© 2026 BereNails Studio. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
```

### 1.3 Página Home

```typescript
// src/pages/public/Home.tsx
import { Navbar } from '@/components/public/Navbar';
import { Hero } from '@/components/public/Hero';
import { ServicesSection } from '@/components/public/ServicesSection';
import { PromotionsSection } from '@/components/public/PromotionsSection';
import { Gallery } from '@/components/public/Gallery';
import { Footer } from '@/components/public/Footer';

export function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ServicesSection />
      <PromotionsSection />
      <Gallery />
      {/* Placeholder para sección de citas - se agregará en Fase 2 */}
      <div id="citas" className="py-16 bg-pink-50 text-center">
        <h2 className="text-3xl font-bold text-berenails-dark mb-4">Solicita tu Cita</h2>
        <p className="text-gray-600">Próximamente: Formulario de citas en línea</p>
      </div>
      <Footer />
    </div>
  );
}
```

### 1.4 Router Setup

```typescript
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/public/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### 1.5 Deployment en Cloudflare Pages

```bash
# 1. Push a GitHub
git add .
git commit -m "feat(fase1): landing page estática completa"
git push origin main

# 2. En Cloudflare Pages:
# - Conectar repositorio de GitHub
# - Build command: npm run build
# - Build output directory: dist
# - Deploy

# 3. Configurar dominio personalizado (opcional)
```

**✅ Checkpoint Fase 1:**
- [ ] Navbar responsive funcionando
- [ ] Hero section con llamada a acción
- [ ] Sección de servicios con 4 servicios
- [ ] Sección de promociones con placeholder "Próximamente"
- [ ] Galería con 6 placeholders
- [ ] Footer con información de contacto
- [ ] Sitio 100% responsive (probado en 320px y 1920px)
- [ ] Publicado en Cloudflare Pages
- [ ] Sin errores de TypeScript
- [ ] Performance: Lighthouse score >90

---

## 📝 Fase 2: Sistema de Citas

> **Objetivo:** Implementar formulario de citas con validación y almacenamiento en Supabase.

**Duración:** 1-2 semanas  
**Publicación:** Cloudflare Pages (producción)

### 2.1 Setup de Supabase

#### 2.1.1 Crear Proyecto en Supabase

1. Ir a https://supabase.com
2. Crear nuevo proyecto: "berenails-studio"
3. Guardar URL y anon key

#### 2.1.2 Crear Tabla de Citas

```sql
-- En SQL Editor de Supabase
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  service VARCHAR(100) NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TIME NOT NULL,
  comments TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_created_at ON appointments(created_at DESC);

-- RLS: Permitir INSERT público, lectura solo autenticada
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir INSERT público"
  ON appointments FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Solo admin puede leer"
  ON appointments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Solo admin puede actualizar"
  ON appointments FOR UPDATE
  TO authenticated
  USING (true);
```

#### 2.1.3 Configurar Variables de Entorno

```bash
# Crear .env en la raíz del proyecto
touch .env
```

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_anon_key
```

### 2.2 Cliente de Supabase

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 2.3 Tipos de TypeScript

```typescript
// src/types/appointments.ts
export interface Appointment {
  id?: string;
  client_name: string;
  phone: string;
  service: string;
  preferred_date: string;
  preferred_time: string;
  comments?: string;
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at?: string;
  updated_at?: string;
}

export interface AppointmentFormData {
  client_name: string;
  phone: string;
  service: string;
  preferred_date: string;
  preferred_time: string;
  comments: string;
}
```

### 2.4 Formulario de Citas

```typescript
// src/components/public/AppointmentForm.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/shared/Button';
import type { AppointmentFormData } from '@/types/appointments';

export function AppointmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AppointmentFormData>();

  const onSubmit = async (data: AppointmentFormData) => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('appointments').insert([
        {
          client_name: data.client_name,
          phone: data.phone,
          service: data.service,
          preferred_date: data.preferred_date,
          preferred_time: data.preferred_time,
          comments: data.comments || null,
          status: 'pending',
        },
      ]);

      if (error) throw error;

      toast.success('¡Cita solicitada con éxito! Nos pondremos en contacto contigo pronto.');
      reset();
    } catch (error) {
      console.error('Error al crear cita:', error);
      toast.error('Hubo un error al solicitar tu cita. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <section className="py-16 px-4 bg-pink-50" id="citas">
      <Toaster position="top-center" />
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-berenails-dark mb-8">
          Solicita tu Cita
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
          {/* Nombre */}
          <div>
            <label htmlFor="client_name" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre completo *
            </label>
            <input
              id="client_name"
              type="text"
              {...register('client_name', {
                required: 'Ingresa tu nombre completo',
                minLength: { value: 3, message: 'El nombre debe tener al menos 3 caracteres' },
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berenails-pink focus:border-transparent"
            />
            {errors.client_name && (
              <p className="mt-1 text-sm text-red-600">{errors.client_name.message}</p>
            )}
          </div>

          {/* Teléfono */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Teléfono (10 dígitos) *
            </label>
            <input
              id="phone"
              type="tel"
              {...register('phone', {
                required: 'Ingresa tu teléfono',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'El teléfono debe tener 10 dígitos',
                },
              })}
              placeholder="3312345678"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berenails-pink focus:border-transparent"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
          </div>

          {/* Servicio */}
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
              Servicio *
            </label>
            <select
              id="service"
              {...register('service', { required: 'Selecciona un servicio' })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berenails-pink focus:border-transparent"
            >
              <option value="">Selecciona un servicio</option>
              <option value="Manicure">Manicure</option>
              <option value="Pedicure">Pedicure</option>
              <option value="Uñas Acrílicas">Uñas Acrílicas</option>
              <option value="Extensión de Pestañas">Extensión de Pestañas</option>
              <option value="Otro">Otro</option>
            </select>
            {errors.service && <p className="mt-1 text-sm text-red-600">{errors.service.message}</p>}
          </div>

          {/* Fecha y Hora */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="preferred_date" className="block text-sm font-medium text-gray-700 mb-2">
                Fecha preferida *
              </label>
              <input
                id="preferred_date"
                type="date"
                min={today}
                {...register('preferred_date', { required: 'Selecciona una fecha' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berenails-pink focus:border-transparent"
              />
              {errors.preferred_date && (
                <p className="mt-1 text-sm text-red-600">{errors.preferred_date.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="preferred_time" className="block text-sm font-medium text-gray-700 mb-2">
                Hora preferida *
              </label>
              <input
                id="preferred_time"
                type="time"
                min="09:00"
                max="18:00"
                {...register('preferred_time', {
                  required: 'Selecciona una hora',
                  validate: (value) => {
                    const hour = parseInt(value.split(':')[0]);
                    return (hour >= 9 && hour < 18) || 'El horario debe ser entre 9:00 y 18:00';
                  },
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berenails-pink focus:border-transparent"
              />
              {errors.preferred_time && (
                <p className="mt-1 text-sm text-red-600">{errors.preferred_time.message}</p>
              )}
            </div>
          </div>

          {/* Comentarios */}
          <div>
            <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-2">
              Comentarios adicionales (opcional)
            </label>
            <textarea
              id="comments"
              rows={4}
              {...register('comments')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berenails-pink focus:border-transparent"
              placeholder="Indica si tienes alguna preferencia especial..."
            />
          </div>

          <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Solicitar Cita'}
          </Button>
        </form>
      </div>
    </section>
  );
}
```

### 2.5 Actualizar Home Page

```typescript
// src/pages/public/Home.tsx
import { Navbar } from '@/components/public/Navbar';
import { Hero } from '@/components/public/Hero';
import { ServicesSection } from '@/components/public/ServicesSection';
import { Gallery } from '@/components/public/Gallery';
import { AppointmentForm } from '@/components/public/AppointmentForm'; // NUEVO
import { Footer } from '@/components/public/Footer';

export function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ServicesSection />
      <Gallery />
      <AppointmentForm /> {/* REEMPLAZA el placeholder */}
      <Footer />
    </div>
  );
}
```

### 2.6 Mini-Visor Temporal de Citas

> **Importante:** Este visor es temporal solo para Fase 2. Se reemplazará completamente por el panel admin en Fase 3.

#### 2.6.1 Crear Componente CitasViewer

```typescript
// src/pages/admin/CitasViewer.tsx
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Appointment } from '@/types/appointments';
import { RefreshCw, Phone, Calendar, Clock } from 'lucide-react';

export function CitasViewer() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed'>('all');

  useEffect(() => {
    fetchAppointments();

    // Auto-refresh cada 30 segundos
    const interval = setInterval(fetchAppointments, 30000);

    return () => clearInterval(interval);
  }, [filter]);

  const fetchAppointments = async () => {
    setLoading(true);
    let query = supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });

    if (filter !== 'all') {
      query = query.eq('status', filter);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error:', error);
    } else {
      setAppointments(data || []);
    }
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      pending: 'Pendiente',
      confirmed: 'Confirmada',
      cancelled: 'Cancelada',
      completed: 'Completada',
    };
    return labels[status as keyof typeof labels] || status;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-berenails-pink mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando citas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-berenails-dark mb-2">
                Visor de Citas - BereNails Studio
              </h1>
              <p className="text-gray-600">
                Vista temporal para monitorear solicitudes de citas
              </p>
            </div>
            <button
              onClick={fetchAppointments}
              className="flex items-center gap-2 px-4 py-2 bg-berenails-pink text-white rounded-lg hover:bg-pink-700 transition-colors"
            >
              <RefreshCw size={20} />
              Actualizar
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                filter === 'all'
                  ? 'bg-berenails-pink text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todas ({appointments.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                filter === 'pending'
                  ? 'bg-berenails-pink text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pendientes
            </button>
            <button
              onClick={() => setFilter('confirmed')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                filter === 'confirmed'
                  ? 'bg-berenails-pink text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Confirmadas
            </button>
          </div>
        </div>

        {/* Lista de Citas */}
        {appointments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">
              No hay citas {filter !== 'all' && getStatusLabel(filter).toLowerCase()}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {appointments.map((apt) => (
              <div key={apt.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(apt.status || 'pending')}`}>
                    {getStatusLabel(apt.status || 'pending')}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(apt.created_at || '').toLocaleDateString('es-MX')}
                  </span>
                </div>

                {/* Cliente Info */}
                <h3 className="text-xl font-semibold text-berenails-dark mb-2">
                  {apt.client_name}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone size={16} />
                    <a href={`tel:${apt.phone}`} className="hover:text-berenails-pink">
                      {apt.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={16} />
                    <span>
                      {new Date(apt.preferred_date).toLocaleDateString('es-MX', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={16} />
                    <span>{apt.preferred_time}</span>
                  </div>
                </div>

                {/* Servicio */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-1">Servicio:</p>
                  <p className="text-berenails-pink font-semibold">{apt.service}</p>
                </div>

                {/* Comentarios */}
                {apt.comments && (
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium text-gray-700 mb-1">Comentarios:</p>
                    <p className="text-sm text-gray-600">{apt.comments}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Nota Importante */}
        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
          <p className="text-yellow-800">
            <strong>Nota:</strong> Este es un visor temporal. Para gestionar citas (confirmar, cancelar, editar),
            espera al panel de administración completo en la Fase 3.
          </p>
        </div>
      </div>
    </div>
  );
}
```

#### 2.6.2 Agregar Ruta al Visor

```typescript
// src/App.tsx - Agregar esta ruta TEMPORAL
import { CitasViewer } from '@/pages/admin/CitasViewer';

// Dentro de <Routes>:
<Route path="/citas-viewer" element={<CitasViewer />} />
```

#### 2.6.3 Acceder al Visor

```
Navegar a: https://tu-sitio.pages.dev/citas-viewer
```

**Importante:** Esta URL es temporal y será removida en Fase 3. Guárdala en tus marcadores.

### 2.7 Testing

```typescript
// src/components/public/__tests__/AppointmentForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AppointmentForm } from '../AppointmentForm';
import { vi } from 'vitest';

// Mock Supabase
vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: () => ({
      insert: vi.fn().mockResolvedValue({ data: {}, error: null }),
    }),
  },
}));

describe('AppointmentForm', () => {
  it('debe renderizar todos los campos', () => {
    render(<AppointmentForm />);
    expect(screen.getByLabelText(/Nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Teléfono/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Servicio/i)).toBeInTheDocument();
  });

  it('debe validar teléfono de 10 dígitos', async () => {
    render(<AppointmentForm />);
    const phoneInput = screen.getByLabelText(/Teléfono/i);
    
    fireEvent.change(phoneInput, { target: { value: '123' } });
    fireEvent.blur(phoneInput);

    await waitFor(() => {
      expect(screen.getByText(/debe tener 10 dígitos/i)).toBeInTheDocument();
    });
  });
});
```

```bash
# Correr tests
npm run test
```

### 2.8 Deployment Fase 2

```bash
# Commit y push
git add .
git commit -m "feat(fase2): formulario de citas con Supabase"
git push origin main

# Configurar variables de entorno en Cloudflare Pages:
# VITE_SUPABASE_URL
# VITE_SUPABASE_ANON_KEY

# Deploy automático se ejecutará
```

**✅ Checkpoint Fase 2:**
- [ ] Tabla appointments creada en Supabase con RLS
- [ ] Formulario valida todos los campos correctamente
- [ ] Citas se guardan en Supabase con status 'pending'
- [ ] Toast de éxito aparece después de enviar
- [ ] Formulario se limpia después de envío exitoso
- [ ] No permite fechas pasadas ni horas fuera de 9-18
- [ ] CitasViewer accesible en `/citas-viewer` mostrando todas las citas
- [ ] CitasViewer tiene filtros por status (Todas, Pendientes, Confirmadas)
- [ ] CitasViewer se actualiza automáticamente cada 30 segundos
- [ ] Tests de formulario pasando
- [ ] Variables de entorno configuradas en Cloudflare
- [ ] **Publicado en producción (Release Fase 2)**
- [ ] Puedes monitorear citas desde el CitasViewer en tu móvil

---

## 🚀 Estrategia de Releases por Fase

Cada fase se publica independientemente en producción usando Cloudflare Pages:

### Release Fase 1: Landing Estático
**Tag:** `v0.1.0-landing`
```bash
git add .
git commit -m "feat(fase1): landing page estática con placeholder de promociones"
git tag v0.1.0-landing
git push origin main --tags
```
**URL de producción:** `https://berenails-studio.pages.dev`

**Entregable:**
- ✅ Sitio público navegable
- ✅ Información del salón
- ✅ Placeholder de promociones
- ✅ Placeholder de formulario de citas
- ✅ 100% responsive

---

### Release Fase 2: Sistema de Citas
**Tag:** `v0.2.0-citas`
```bash
git add .
git commit -m "feat(fase2): formulario de citas + CitasViewer temporal"
git tag v0.2.0-citas
git push origin main --tags
```
**URLs:**
- Sitio público: `https://berenails-studio.pages.dev`
- CitasViewer: `https://berenails-studio.pages.dev/citas-viewer`

**Entregable:**
- ✅ Todo de Fase 1
- ✅ Formulario de citas funcional
- ✅ Almacenamiento en Supabase
- ✅ CitasViewer para monitorear solicitudes
- ✅ Variables de entorno en Cloudflare configuradas

**Variables de Entorno en Cloudflare:**
1. Ir a Cloudflare Pages > tu proyecto > Settings > Environment variables
2. Agregar:
   - `VITE_SUPABASE_URL`: tu URL de Supabase
   - `VITE_SUPABASE_ANON_KEY`: tu anon key de Supabase
3. Aplicar a: **Production** y **Preview**
4. Re-deploy para aplicar cambios

---

### Release Fase 3: Panel Admin Completo
**Tag:** `v1.0.0`
```bash
git add .
git commit -m "feat(fase3): panel admin mobile-first completo"
git tag v1.0.0
git push origin main --tags
```
**URLs:**
- Sitio público: `https://berenails-studio.pages.dev`
- Panel admin: `https://berenails-studio.pages.dev/admin`

**Entregable:**
- ✅ Todo de Fase 1 y 2
- ✅ Panel admin mobile-first
- ✅ Gestión completa de citas
- ✅ Gestión de promociones
- ✅ Notificaciones en tiempo real
- ✅ CitasViewer removido (reemplazado por panel admin)

**Limpieza en Fase 3:**
```bash
# Remover CitasViewer temporal
rm src/pages/admin/CitasViewer.tsx

# Remover ruta temporal de App.tsx
# <Route path="/citas-viewer" element={<CitasViewer />} />
```

---

## 🎛️ Fase 3: Panel de Administración Mobile-First

> **Objetivo:** Dashboard completo para gestionar citas y promociones desde móvil/tablet.

**Duración:** 2-3 semanas  
**Publicación:** Cloudflare Pages (producción) - Release completo

### 3.1 Setup de Autenticación

#### 3.1.1 Crear Usuario Admin en Supabase

```bash
# En Supabase Dashboard > Authentication > Users
# Click "Add user" > Email:
# Email: admin@berenails.com (o tu email)
# Password: [contraseña segura]
# Confirm password
# Auto Confirm User: ON
```

#### 3.1.2 Auth Store con Zustand

```typescript
// src/store/authStore.ts
import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  initialize: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    set({ user: session?.user ?? null, loading: false });

    supabase.auth.onAuthStateChange((_event, session) => {
      set({ user: session?.user ?? null });
    });
  },

  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) return { error };

      set({ user: data.user });
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));
```

#### 3.1.3 Protected Route Component

```typescript
// src/components/admin/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
```

### 3.2 Login Page

```typescript
// src/pages/admin/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/shared/Button';
import toast, { Toaster } from 'react-hot-toast';

interface LoginFormData {
  email: string;
  password: string;
}

export function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const { signIn } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);

    const { error } = await signIn(data.email, data.password);

    if (error) {
      toast.error('Credenciales incorrectas');
      setIsSubmitting(false);
    } else {
      toast.success('¡Bienvenida!');
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-pink-50 px-4">
      <Toaster position="top-center" />
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-berenails-dark">BereNails Studio</h1>
          <p className="text-gray-600 mt-2">Panel de Administración</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Ingresa tu email',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido',
                },
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berenails-pink focus:border-transparent"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              {...register('password', { required: 'Ingresa tu contraseña' })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berenails-pink focus:border-transparent"
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
          </div>

          <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
        </form>
      </div>
    </div>
  );
}
```

### 3.3 Bottom Navigation (Mobile-First)

```typescript
// src/components/admin/BottomNav.tsx
import { LayoutDashboard, Calendar, Gift, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function BottomNav() {
  const location = useLocation();
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    fetchPendingCount();

    // Suscripción en tiempo real
    const channel = supabase
      .channel('appointments-count')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'appointments',
        },
        () => {
          fetchPendingCount();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchPendingCount = async () => {
    const { count } = await supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    setPendingCount(count || 0);
  };

  const tabs = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/appointments', icon: Calendar, label: 'Citas', badge: pendingCount },
    { path: '/admin/promotions', icon: Gift, label: 'Promociones' },
    { path: '/admin/profile', icon: User, label: 'Perfil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden z-50">
      <div className="grid grid-cols-4 h-16">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;

          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center justify-center relative min-h-[44px] min-w-[44px] ${
                isActive ? 'text-berenails-pink' : 'text-gray-600'
              }`}
            >
              <Icon size={24} />
              {tab.badge && tab.badge > 0 && (
                <span className="absolute top-1 right-1/4 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
              <span className="text-xs mt-1">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

### 3.4 Sidebar (Desktop Only)

```typescript
// src/components/admin/Sidebar.tsx
import { LayoutDashboard, Calendar, Gift, User, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';

export function Sidebar() {
  const location = useLocation();
  const { signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const tabs = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/appointments', icon: Calendar, label: 'Citas' },
    { path: '/admin/promotions', icon: Gift, label: 'Promociones' },
    { path: '/admin/profile', icon: User, label: 'Perfil' },
  ];

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-berenails-dark">BereNails Studio</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;

          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-pink-100 text-berenails-pink'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon size={20} />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 w-full transition-colors"
        >
          <LogOut size={20} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
```

### 3.5 Admin Layout

```typescript
// src/components/admin/AdminLayout.tsx
import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { Sidebar } from './Sidebar';

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="lg:ml-64">
        <header className="bg-white border-b border-gray-200 px-4 py-4 lg:px-8">
          <h2 className="text-xl font-semibold text-berenails-dark">Panel de Administración</h2>
        </header>

        <main className="p-4 lg:p-8 pb-20 lg:pb-8">
          <Outlet />
        </main>
      </div>

      <BottomNav />
    </div>
  );
}
```

### 3.6 Dashboard Page

```typescript
// src/pages/admin/AdminDashboard.tsx
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Calendar, CheckCircle, Gift } from 'lucide-react';

export function AdminDashboard() {
  const [metrics, setMetrics] = useState({
    pending: 0,
    confirmedToday: 0,
    activePromotions: 0,
  });

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    const today = new Date().toISOString().split('T')[0];

    const { count: pending } = await supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    const { count: confirmedToday } = await supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'confirmed')
      .eq('preferred_date', today);

    // Promociones activas (agregar cuando esté la tabla)
    const activePromotions = 0;

    setMetrics({
      pending: pending || 0,
      confirmedToday: confirmedToday || 0,
      activePromotions,
    });
  };

  const cards = [
    { title: 'Citas Pendientes', value: metrics.pending, icon: Calendar, color: 'bg-yellow-100 text-yellow-600' },
    { title: 'Confirmadas Hoy', value: metrics.confirmedToday, icon: CheckCircle, color: 'bg-green-100 text-green-600' },
    { title: 'Promociones Activas', value: metrics.activePromotions, icon: Gift, color: 'bg-pink-100 text-berenails-pink' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-berenails-dark mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {cards.map((card) => (
          <div key={card.title} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">{card.title}</p>
                <p className="text-3xl font-bold text-berenails-dark">{card.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${card.color}`}>
                <card.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Bienvenida</h2>
        <p className="text-gray-600">
          Aquí podrás gestionar todas las citas y promociones de BereNails Studio.
          Navega usando el menú inferior en móvil o el menú lateral en desktop.
        </p>
      </div>
    </div>
  );
}
```

### 3.7 Gestión de Citas (simplificado)

Por brevedad, aquí el código esencial. El resto sigue los mismos patrones:

```typescript
// src/pages/admin/Appointments.tsx
// Ver spec.md sección 3.3 para funcionalidades completas
// - Tabla con todas las citas
// - Filtros por status
// - Acciones: Confirmar, Cancelar, Completar, Editar, Eliminar
// - Notificaciones en tiempo real
```

### 3.8 Gestión de Promociones

```typescript
// Crear tabla promotions en Supabase (ver spec.md)
// Crear bucket 'promotions' en Supabase Storage
// Implementar CRUD de promociones con compresión de imágenes
```

### 3.9 Actualizar Router

```typescript
// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

// Public
import { Home } from '@/pages/public/Home';

// Admin
import { Login } from '@/pages/admin/Login';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { Appointments } from '@/pages/admin/Appointments';
import { Promotions } from '@/pages/admin/Promotions';
import { Profile } from '@/pages/admin/Profile';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';

function App() {
  const { initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="promotions" element={<Promotions />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### 3.10 Deployment Final

```bash
# Commit final
git add .
git commit -m "feat(fase3): panel admin completo mobile-first"
git push origin main

# Tag de release
git tag v1.0.0
git push origin v1.0.0

# Deploy automático en Cloudflare Pages
```

**✅ Checkpoint Fase 3:**
- [ ] Login funciona con Supabase Auth
- [ ] Bottom Navigation visible en móvil (<1024px)
- [ ] Sidebar visible en desktop (≥1024px)
- [ ] Dashboard muestra métricas correctas
- [ ] Gestión de citas completa (CRUD)
- [ ] Notificaciones en tiempo real funcionando
- [ ] Badge numérico en tab de Citas
- [ ] Gestión de promociones completa
- [ ] Compresión de imágenes antes de subir
- [ ] Todas las áreas táctiles ≥44x44px
- [ ] Navegación accesible con una sola mano
- [ ] Tests pasando
- [ ] Lighthouse Performance >90
- [ ] Sin errores de TypeScript
- [ ] Release v1.0.0 publicado en producción

---

## 📊 Cronograma Sugerido

| Fase | Duración | Semanas | Acumulado |
|------|----------|---------|-----------|
| 0: Setup | 1-2 días | - | - |
| 1: Landing | 1-2 semanas | 1-2 | 1-2 |
| 2: Citas | 1-2 semanas | 1-2 | 2-4 |
| 3: Admin | 2-3 semanas | 2-3 | 4-7 |
| **Total** | **4-7 semanas** | - | - |

---

## 🛠️ Comandos de Referencia Rápida

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo
npm run build            # Build de producción
npm run preview          # Preview del build
npm run test             # Correr tests
npm run lint             # Linting

# Git
git add .
git commit -m "feat: descripción"
git push origin main

# Supabase (si instalas CLI)
supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts
```

---

## ✅ Criterios de Éxito General

Al finalizar las 3 fases:

**Fase 1 - Landing (Publicado):**
- [ ] Landing page estático en producción
- [ ] Responsive 100% (320px - 1920px)
- [ ] Placeholder de promociones visible
- [ ] Performance >90 en Lighthouse
- [ ] Release tag: `v0.1.0-landing`

**Fase 2 - Citas (Publicado):**
- [ ] Formulario de citas funcional en producción
- [ ] Citas almacenándose en Supabase
- [ ] CitasViewer accesible para monitorear solicitudes
- [ ] Variables de entorno configuradas en Cloudflare
- [ ] Release tag: `v0.2.0-citas`

**Fase 3 - Admin (Publicado):**
- [ ] Panel admin mobile-first en producción
- [ ] Bottom Navigation funcionando en móvil
- [ ] Sidebar funcionando en desktop
- [ ] Gestión completa de citas (CRUD + notificaciones)
- [ ] Gestión completa de promociones
- [ ] CitasViewer temporal removido
- [ ] Release tag: `v1.0.0`

**Calidad General:**
- [ ] Todas las secciones de constitution.md v3.3 implementadas
- [ ] Todos los criterios de spec.md v2.5 completados
- [ ] 42 checkboxes de criterios de aceptación marcados
- [ ] TypeScript en modo strict sin errores
- [ ] Tests con coverage >60%
- [ ] Costo de infraestructura: $0 USD/mes
- [ ] Documentación actualizada en changelog.md

---

## ❓ Preguntas Frecuentes

### ¿Por qué no esperamos a completar todo antes de publicar?
**R:** Cada fase entrega valor real al negocio:
- **Fase 1:** Presencia web profesional (puedes compartir el link en redes)
- **Fase 2:** Empiezas a capturar citas reales mientras construyes el admin
- **Fase 3:** Gestión completa

Esta estrategia te permite validar con usuarios reales y recibir feedback temprano.

### ¿Qué pasa si recibo muchas citas en Fase 2 sin admin?
**R:** El CitasViewer te permite ver todas las solicitudes en tiempo real. Puedes:
- Abrir el CitasViewer desde tu móvil
- Ver detalles de cada cita (nombre, teléfono, fecha, hora)
- Llamar directamente desde el visor (enlaces `tel:`)
- Monitoreo automático cada 30 segundos

### ¿Puedo saltarme directamente a Fase 3?
**R:** Sí, pero no es recomendable porque:
- Perderías la oportunidad de validar el sitio público primero
- Sería más difícil hacer debug de un proyecto completo de golpe
- No tendrías releases incrementales para mostrar progreso

### ¿Qué pasa con el CitasViewer en Fase 3?
**R:** Se elimina completamente y se reemplaza por el panel admin. Antes de eliminarlo:
1. Asegúrate de que el panel admin funciona correctamente
2. Migra cualquier flujo que dependiera de él
3. Elimina el archivo y la ruta

### ¿Cómo reemplazo los placeholders de imágenes?
**R:** En Fase 1:
1. Coloca tus imágenes en `public/` o `src/assets/images/`
2. Reemplaza las URLs de placeholder en los componentes
3. Optimiza las imágenes (usa https://tinypng.com o similar)
4. Commit y redeploy

### ¿Puedo usar un dominio personalizado?
**R:** Sí, Cloudflare Pages permite dominios custom gratis:
1. Ve a tu proyecto en Cloudflare Pages
2. Settings > Custom domains
3. Agrega tu dominio (ej: `berenails.com`)
4. Actualiza los DNS según las instrucciones

### ¿Qué hago si encuentro un bug en producción?
**R:**
```bash
# 1. Crear rama de hotfix
git checkout -b hotfix/nombre-del-bug

# 2. Fix el bug
# ... hacer cambios ...

# 3. Commit
git add .
git commit -m "fix: descripción del bug"

# 4. Merge a main
git checkout main
git merge hotfix/nombre-del-bug

# 5. Push (Cloudflare auto-deploya)
git push origin main

# 6. Tag si es necesario
git tag v0.1.1
git push origin v0.1.1
```

### ¿Cómo pruebo en diferentes dispositivos?
**R:**
- **Chrome DevTools:** F12 > Toggle device toolbar (Ctrl+Shift+M)
- **Dispositivos reales:** Despliega a producción y abre desde tu móvil
- **BrowserStack:** Servicio para probar en múltiples dispositivos reales

### ¿Necesito saber React para seguir este plan?
**R:** Nivel básico-intermedio es suficiente. El plan incluye código completo que puedes copiar. Si delegas a IA (Claude, Copilot):
```
@workspace Lee /sdd-docs/plan.md fase 1
Implementa el componente Navbar siguiendo las especificaciones exactas.
```

### ¿Cuánto cuesta mantener esto mensualmente?
**R:** $0 USD si te mantienes en los planes free:
- Supabase Free: 500MB DB, 1GB Storage
- Cloudflare Pages: Hosting ilimitado
- Sin costos ocultos

Si creces y necesitas más:
- Supabase Pro: $25/mes (8GB DB, 100GB Storage)
- Cloudflare Pages: siempre gratis

---

**Fin del plan.md v1.0**
