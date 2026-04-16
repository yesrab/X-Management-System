# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

X Management System — a multi-tenant education management platform (schools, colleges, universities). Built with Next.js 16 App Router, Prisma 7 ORM, PostgreSQL, and Tailwind CSS 4. Uses pnpm as the package manager.

## Commands

```bash
pnpm dev              # Start Next.js dev server (localhost:3000)
pnpm build            # Run Prisma migrate deploy + generate + next build
pnpm lint             # ESLint (flat config, next/core-web-vitals + typescript)
pnpm start            # Start production server (requires prior build)

# Prisma
pnpm dlx prisma migrate dev          # Create/apply dev migrations
pnpm dlx prisma generate             # Regenerate Prisma client
pnpm dlx prisma db seed              # Seed database (runs tsx ./src/prisma/seed.ts)
pnpm dlx prisma migrate deploy       # Apply migrations (production)
```

## Architecture

### Multi-Tenant RBAC Data Model

The system is organization-scoped (multi-tenant). The permission chain works as:

**Organization → Policy → FeatureCollection → CollectionFeatureMap → ModuleFeature**

- `User` is a global identity (email + passwordHash via argon2id)
- `OrganizationMembership` links a User to an Organization with a specific UserType and status
- `UserType` is an org-scoped role (e.g., ADMIN) tied to a `Policy`
- `Policy` groups `FeatureCollection`s, which map to global `ModuleFeature`s
- `ModuleFeature` has a `permissionKey` (e.g., `dashboard:view`, `users:create`) and a `FeatureType` (ROUTE, COMPONENT, API)

### Prisma Configuration

- Schema lives at `src/prisma/schema.prisma` (not the default `prisma/` root)
- Migrations directory: `src/prisma/migrations/`
- Generated client output: `src/generated/prisma/` (imported as `@/generated/prisma/client`)
- Config file: `prisma.config.ts` — uses `DATABASE_URL` locally, `POSTGRES_URL` in production
- Uses `@prisma/adapter-pg` (pg driver adapter) with `@prisma/extension-accelerate`
- Preview feature enabled: `relationJoins`

### App Router Layout

Three route groups with separate root layouts:

- `(Landing)` — public marketing pages at `/`
- `(access)` — auth flows at `/access/login`, `/access/signup`
- `(admin)` — authenticated dashboard at `/admin/dashboard` (has sidebar + notification drawer)

### Auth Flow

- Login uses **TanStack React Form** with Zod validation (shared schema in `src/components/access/login/login-form-options.ts`)
- Server action in `src/app/(access)/login/action.ts` performs dual client/server validation via `createServerValidate`
- Password hashing: argon2id via `@node-rs/argon2` (`src/lib/crypto.ts`)
- Sessions: JWT (HS256) via `jose`, stored as httpOnly cookie (`src/lib/sessions.ts`). Secret from `SESSION_SECRET` env var.

### API Routes

- `POST /api/access/logout` — session deletion
- `POST /api/dev/seed` — database reset + seed (blocked in prod without secret)
- `GET /api/dev/isDbDirty` — checks if DB has data

### Key Libraries & Patterns

- **UI components**: shadcn/ui (new-york style) with Radix UI primitives, located in `src/components/ui/`
- **Path alias**: `@/*` maps to `./src/*`
- **Logging**: pino (pretty-printed in dev, JSON in prod) — `src/lib/logger.ts`
- **Forms**: TanStack React Form with Next.js server actions integration (`@tanstack/react-form-nextjs`)
- **Theming**: next-themes with system default, class-based strategy

### Environment Variables

Required:
- `DATABASE_URL` — PostgreSQL connection string (used in dev + Prisma migrations)
- `SESSION_SECRET` — JWT signing key (falls back to `'danger'` if unset)

Production-only:
- `POSTGRES_URL` / `PRISMA_DATABASE_URL` — production database URLs

### Node Version

`.nvmrc` specifies Node v24.14.0.
