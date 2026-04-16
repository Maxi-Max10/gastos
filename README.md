# GastosIA - Control de Gastos con Inteligencia Artificial

App de control de gastos personal con IA (Google Gemini), ajuste por inflación y soporte multi-usuario.

## Características

- **Control de Gastos**: Registra, categoriza, filtra y elimina gastos
- **Dashboard**: Resúmenes visuales por mes y categoría
- **Ajuste por Inflación**: Ingresa tu salario y calcula el poder adquisitivo real
- **Chat con IA**: Pregúntale a Gemini sobre tus finanzas, resúmenes y consejos
- **Multi-usuario**: Autenticación con email/contraseña, datos aislados por usuario
- **Responsive**: Funciona en móvil y escritorio

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Base de datos**: PostgreSQL + Prisma ORM
- **Autenticación**: NextAuth.js
- **IA**: Google Gemini (gemini-2.0-flash)
- **UI**: Tailwind CSS
- **Deploy**: Vercel

## Setup Local

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Copia `.env.example` a `.env` y completa:

```bash
cp .env.example .env
```

- **DATABASE_URL**: URL de PostgreSQL (puedes usar [Neon](https://neon.tech) gratis)
- **NEXTAUTH_SECRET**: Genera uno con `openssl rand -base64 32`
- **GEMINI_API_KEY**: Obtén una en [Google AI Studio](https://aistudio.google.com/app/apikey)

### 3. Inicializar la base de datos

```bash
npx prisma db push
```

### 4. Ejecutar

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## Deploy en Vercel

### 1. Subir a GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/gastos-app.git
git push -u origin main
```

### 2. Deploy en Vercel

1. Ve a [vercel.com](https://vercel.com) e importa tu repositorio
2. Agrega las variables de entorno:
   - `DATABASE_URL` (usa Vercel Postgres o Neon)
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (tu dominio de Vercel, ej: `https://gastos-app.vercel.app`)
   - `GEMINI_API_KEY`
3. Deploy!

### Base de datos recomendada

- **[Neon](https://neon.tech)**: PostgreSQL serverless gratuito, perfecto para Vercel
- **[Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)**: Integrado con Vercel

## Categorías de Gastos

Alimentación, Transporte, Vivienda, Entretenimiento, Salud, Educación, Ropa, Servicios, Ahorro, Otro.
