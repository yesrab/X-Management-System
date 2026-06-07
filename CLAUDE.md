# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

X Management System — a multi-tenant education management platform (schools, colleges, universities). Nx monorepo with two applications and a shared library. Uses pnpm as the package manager.

### Workspace Structure

```
apps/edu-plus/         Next.js 16 App Router frontend + edge backend (port 3000)
apps/edu-core/         NestJS 11 sustained backend for prolonged tasks (port 3001)
libs/prisma-client/    Shared Prisma library (@x-mgmt/prisma-client)
```

## Commands

```bash
# Development (2 separate Nx commands, DB URL from env)
pnpm dev:edu-plus          # Next.js dev server (localhost:3000)
pnpm dev:edu-core          # NestJS watch mode (localhost:3001)
pnpm dev                   # Both in parallel

# Build
pnpm build                 # Build all apps (auto-runs prisma generate)
npx nx build edu-plus      # Build Next.js only
npx nx build edu-core      # Build NestJS only

# Lint
pnpm lint                  # Lint all projects

# Prisma (via Nx targets on prisma-client lib)
pnpm prisma:generate       # Regenerate Prisma client
pnpm prisma:migrate:dev    # Create/apply dev migrations
pnpm prisma:migrate:deploy # Apply migrations (production)
pnpm prisma:seed           # Seed database

# Docker
docker compose -f docker-compose.dev.yml up --build   # Demo: Next.js + NestJS (DB from env)
docker compose -f docker-compose.prod.yml up --build   # Prod: Next.js + NestJS + PostgreSQL
```

### Vercel

EduPlus (Next.js) is the only Vercel-deployable app. `vercel.json` at the repo root drives the build (`pnpm nx build edu-plus`); the Vercel project Root Directory should stay at `./`. EduCore (NestJS) is not deployed via Vercel — point EduPlus at it via the `EDUCORE_URL` env var. Migrations are not part of the build target; run `pnpm prisma:migrate:deploy` as a separate release step.

## Architecture

### Monorepo Communication

- **Next.js frontend -> Next.js backend**: normal `/api` routes (unchanged)
- **Next.js -> NestJS**: `/epi/:path*` routes, proxied via Next.js `rewrites()` in `apps/edu-plus/next.config.ts` to `${EDUCORE_URL}/epi/:path*`
- **NestJS global prefix**: `epi` (set in `apps/edu-core/src/main.ts`) — all NestJS endpoints live under `/epi/...`
- **Shared data layer**: both apps import from `@x-mgmt/prisma-client` (resolved via tsconfig paths in each app)

### Multi-Tenant RBAC Data Model

The system is organization-scoped (multi-tenant). The permission chain works as:

**Organization -> Policy -> FeatureCollection -> CollectionFeatureMap -> ModuleFeature**

- `User` is a global identity (email + passwordHash via argon2id)
- `OrganizationMembership` links a User to an Organization with a specific UserType and status
- `UserType` is an org-scoped role (e.g., ADMIN) tied to a `Policy`
- `Policy` groups `FeatureCollection`s, which map to global `ModuleFeature`s
- `ModuleFeature` has a `permissionKey` (e.g., `dashboard:view`, `users:create`) and a `FeatureType` (ROUTE, COMPONENT, API)

### Prisma Configuration

- Schema: `libs/prisma-client/prisma/schema.prisma`
- Migrations: `libs/prisma-client/prisma/migrations/`
- Seed script: `libs/prisma-client/prisma/seed.ts`
- Generated client: `libs/prisma-client/src/generated/` (gitignored, regenerate with `pnpm prisma:generate`)
- Root config: `prisma.config.ts` — uses `DATABASE_URL` locally, `POSTGRES_URL` in production
- Uses `@prisma/adapter-pg` (pg driver adapter) with `@prisma/extension-accelerate`
- Preview feature: `relationJoins`

### EduPlus (Next.js) — `apps/edu-plus/`

@AGENTS.md
@stylePhilosophy.md

Three route groups with separate root layouts:

- `(Landing)` — public marketing pages at `/`
- `(access)` — auth flows at `/login`, `/signup`
- `(admin)` — authenticated dashboard at `/dashboard` (has sidebar + notification drawer)

Thin re-export wrappers in `apps/edu-plus/src/lib/` (prisma.ts, crypto.ts, logger.ts) delegate to `@x-mgmt/prisma-client`, preserving `@/lib/*` imports across all existing components. When adding new code in edu-plus, use `@/lib/prisma`, `@/lib/crypto`, `@/lib/logger` — they re-export from the shared lib.

Config files specific to edu-plus: `next.config.ts`, `postcss.config.mjs`, `components.json`, `eslint.config.mjs`, `tsconfig.json`.

### EduCore (NestJS) — `apps/edu-core/`

- Built with webpack + webpack-node-externals (externalizes native node modules like argon2)
- Custom webpack config: `apps/edu-core/webpack.config.js` — resolves `@x-mgmt/prisma-client` via alias
- Global PrismaModule wraps the shared prisma instance for dependency injection
- Health endpoint: `GET /epi/health`
- Config files: `nest-cli.json`, `webpack.config.js`, `tsconfig.json`, `project.json`

### Shared Library — `libs/prisma-client/`

Package name: `@x-mgmt/prisma-client`. Exports:
- `prisma` — singleton Prisma client instance (PrismaPg adapter + Accelerate extension)
- `DbClient` — type alias for the extended Prisma client
- `hashPassword`, `verifyPassword` — argon2id wrappers
- `createLogger(appName)` — pino logger factory (pretty in dev, JSON in prod)
- `seedMain` — database seed entry point
- All Prisma-generated types, enums, and model types

### Auth Flow

- Login uses **TanStack React Form** with Zod validation (schema in `apps/edu-plus/src/components/access/login/login-form-options.ts`)
- Server action in `apps/edu-plus/src/app/(access)/login/action.ts` performs dual client/server validation via `createServerValidate`
- Password hashing: argon2id via `@node-rs/argon2` (`libs/prisma-client/src/crypto.ts`)
- Sessions: JWT (HS256) via `jose`, stored as httpOnly cookie (`apps/edu-plus/src/lib/sessions.ts`). Secret from `SESSION_SECRET` env var.

### API Routes (EduPlus)

- `POST /api/access/logout` — session deletion
- `POST /api/dev/seed` — database reset + seed (blocked in prod without secret)
- `GET /api/dev/isDbDirty` — checks if DB has data

### Key Libraries & Patterns

- **UI components**: shadcn/ui (new-york style) with Radix UI primitives — `apps/edu-plus/src/components/ui/`
- **Path aliases**: `@/*` maps to `./src/*` (edu-plus only). `@x-mgmt/prisma-client` is the shared lib alias (both apps).
- **Logging**: pino via `createLogger(appName)` factory — `libs/prisma-client/src/logger.ts`
- **Forms**: TanStack React Form with Next.js server actions integration (`@tanstack/react-form-nextjs`)
- **Theming**: next-themes with system default, class-based strategy
- **Styling**: Tailwind CSS v4, configured via CSS-first approach in `apps/edu-plus/src/app/globals.css` (no tailwind.config file)

### Nx Configuration

- `nx.json` — workspace config with target defaults (build cached, dev not cached, build depends on `^build`)
- `tsconfig.base.json` — shared compiler options and `@x-mgmt/prisma-client` path mapping
- `tsconfig.json` — project references wrapper
- Each app/lib has its own `project.json` defining Nx targets (dev, build, start, lint)
- Nx task dependencies: edu-plus and edu-core `build`/`dev` targets depend on `prisma-client:generate` only. `prisma-client:migrate-deploy` is a standalone target invoked manually via `pnpm prisma:migrate:deploy`.
- `prisma-client:generate` uses the locally-installed `prisma` binary (not `pnpm dlx prisma`) so Vercel and Docker builds don't refetch the package.

### Environment Variables

Required:
- `DATABASE_URL` — PostgreSQL connection string (used in dev + Prisma migrations)
- `SESSION_SECRET` — JWT signing key (falls back to `'danger'` if unset)

Production/Docker:
- `POSTGRES_URL` / `PRISMA_DATABASE_URL` — production database URLs
- `EDUCORE_URL` — NestJS backend URL for `/epi/*` proxy. When unset, `next.config.ts` emits no rewrite (so Vercel deploys without an EduCore backend won't try to proxy to localhost).
- `EDUCORE_PORT` — NestJS listen port (default: `3001`)

### Node Version

`.nvmrc` specifies Node v24.14.0.
