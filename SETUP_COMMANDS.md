
```markdown
# TripBazarBd - Setup Commands

This document tracks the commands used to initialize and manage the full-stack workspace using Bun.

## 1. Frontend Setup (Next.js)

```bash
# Generate app
bunx create-next-app@latest frontend --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-bun

# Install dependencies
cd frontend
bun add @reduxjs/toolkit react-redux axios

```

## 2. Backend Setup (NestJS)

```bash
# Generate app
bunx @nestjs/cli new backend --skip-install

# Install dependencies & Prisma
cd backend
bun install
bun add prisma --dev
bun add @prisma/client

# Initialize Database
bunx prisma init

```

## 3. NestJS Resource Generation

```bash
cd backend
# Generate the service-item domain
bunx @nestjs/cli generate module service-item
bunx @nestjs/cli generate controller service-item
bunx @nestjs/cli generate service service-item

```

```

---

### 3. The Architecture File (`PROJECT_STRUCTURE.md`)

Create a file named `PROJECT_STRUCTURE.md`. This maps out where everything lives, which is incredibly helpful when navigating a large monorepo.

```markdown
# TripBazarBd - Project Structure

## 🌐 Frontend (Next.js App Router)
Path: `/frontend`

```text
frontend/
├── public/               # Static assets (images, fonts)
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── admin/        # Admin dashboard routes
│   │   ├── layout.tsx    # Global layout (Navbar/Footer)
│   │   └── page.tsx      # Public homepage
│   ├── components/       # Reusable UI elements
│   │   ├── cards/        # Ticket display components
│   │   └── ui/           # Buttons, modals, inputs
│   ├── lib/              # Integrations
│   │   └── axios.ts      # Axios instance with interceptors
│   ├── store/            # Redux Toolkit
│   │   └── slices/       # State slices (e.g., auth)
│   └── types/            # Shared TypeScript interfaces
└── tailwind.config.ts    # Styling configuration

```

## ⚙️ Backend (NestJS + Prisma)

Path: `/backend`

```text
backend/
├── prisma/
│   └── schema.prisma     # Database blueprint
├── src/
│   ├── core/             # Global guards, filters, interceptors
│   ├── modules/          # Feature modules (Domain-Driven Design)
│   │   ├── auth/         # Authentication logic
│   │   └── service-item/ # Ticket inventory feature
│   │       ├── dto/      # Data validation rules
│   │       ├── service-item.controller.ts  
│   │       ├── service-item.service.ts     
│   │       └── service-item.module.ts      
├── .env                  # Environment variables (DB Connection)
└── main.ts               # Application entry point

```

```

---
