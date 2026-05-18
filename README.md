## X Management System

Unified management platform for schools, colleges, and universities. Manage
students, faculty, courses, and administration in one place — from enrollment
and attendance to grades and reporting.

---

## Features

- Multi-level institution modeling: universities, campuses, colleges,
  departments, programs, courses, and classes
- Student & academic lifecycle: enrollment, attendance, grades, outcomes
- Role-based access: admin, faculty, staff, and student-facing experiences
- Analytics-ready data model powered by PostgreSQL + Prisma
- Modern, responsive landing page with dark mode support

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend + Edge Backend | Next.js 16 App Router, React 19, TypeScript |
| Sustained Backend | NestJS 11 |
| Database & ORM | PostgreSQL 17, Prisma 7 |
| Styling | Tailwind CSS 4, Radix UI, shadcn/ui |
| Monorepo | Nx, pnpm workspaces |
| Containerization | Docker Compose (dev + prod) |

---

## Workspace Structure

This is an **Nx monorepo** with two applications and a shared library:

```
X-Management-System/
├── apps/
│   ├── edu-plus/           Next.js frontend + edge backend (port 3000)
│   └── edu-core/           NestJS sustained backend (port 3001)
├── libs/
│   └── prisma-client/      Shared Prisma library (@x-mgmt/prisma-client)
│       ├── prisma/          Schema, migrations, seed script
│       └── src/             Client instance, crypto, logger, generated types
├── docker-compose.dev.yml  Demo compose (no DB — expects DATABASE_URL from env)
├── docker-compose.prod.yml Production compose (Next.js + NestJS + PostgreSQL)
├── nx.json                 Nx workspace config
├── prisma.config.ts        Prisma config (points to libs/prisma-client/prisma/)
└── tsconfig.base.json      Shared TypeScript compiler options
```

### Communication

- **Next.js frontend → Next.js backend**: standard `/api` routes
- **Next.js → NestJS**: `/epi/:path*` routes, proxied server-side via Next.js `rewrites()`
- **Shared data layer**: both apps import from `@x-mgmt/prisma-client`

---

## Prerequisites

- Node.js v24+ (see `.nvmrc`)
- pnpm (`npm install -g pnpm`)
- PostgreSQL database (local or remote)

---

## Environment Setup

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB_NAME"
SESSION_SECRET="your-secret-key"
```

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `SESSION_SECRET` | Yes | JWT signing key (falls back to `'danger'` if unset) |
| `EDUCORE_URL` | No | NestJS URL for proxy (default: `http://localhost:3001`) |
| `EDUCORE_PORT` | No | NestJS listen port (default: `3001`) |
| `POSTGRES_URL` | Prod only | Production database URL |

---

## Installation

```bash
pnpm install
```

---

## Database & Prisma

Run migrations and generate the Prisma client:

```bash
pnpm prisma:migrate:dev    # Create/apply dev migrations
pnpm prisma:generate       # Regenerate Prisma client
```

Populate demo data:

```bash
pnpm prisma:seed
```

The Prisma schema lives at `libs/prisma-client/prisma/schema.prisma` and
migrations at `libs/prisma-client/prisma/migrations/`.

---

## Development

Start each app with its own Nx command (DB URL expected from `.env`):

```bash
pnpm dev:edu-plus          # Next.js on http://localhost:3000
pnpm dev:edu-core          # NestJS on http://localhost:3001
```

Or run both in parallel:

```bash
pnpm dev
```

### Routes

| URL | App | Description |
|---|---|---|
| `/` | EduPlus | Landing page |
| `/login` | EduPlus | Login |
| `/signup` | EduPlus | Signup |
| `/dashboard` | EduPlus | Admin dashboard (auth required) |
| `/api/*` | EduPlus | Next.js API routes |
| `/epi/*` | EduCore (proxied) | NestJS sustained backend |
| `/epi/health` | EduCore | Health check endpoint |

---

## Build

```bash
pnpm build                 # Build all apps (auto-runs prisma generate first)
npx nx build edu-plus      # Build Next.js only
npx nx build edu-core      # Build NestJS only
```

---

## Docker

### Demo deployment (no bundled database)

Starts EduPlus + EduCore containers. Expects `DATABASE_URL` in your environment
or `.env` file:

```bash
docker compose -f docker-compose.dev.yml up --build
```

### Production deployment (full stack)

Starts EduPlus + EduCore + PostgreSQL in a Docker network:

```bash
docker compose -f docker-compose.prod.yml up --build
```

Configure via environment variables or a `.env` file:

```env
POSTGRES_USER=eduplus
POSTGRES_PASSWORD=your-strong-password
POSTGRES_DB=eduplus
SESSION_SECRET=your-secret-key
```

---

## Scripts Reference

| Command | Description |
|---|---|
| `pnpm dev:edu-plus` | Next.js dev server (port 3000) |
| `pnpm dev:edu-core` | NestJS watch mode (port 3001) |
| `pnpm dev` | Both in parallel |
| `pnpm build` | Build all apps |
| `pnpm lint` | Lint all projects |
| `pnpm prisma:generate` | Regenerate Prisma client |
| `pnpm prisma:migrate:dev` | Create/apply dev migrations |
| `pnpm prisma:migrate:deploy` | Apply migrations (production) |
| `pnpm prisma:seed` | Seed database |

---

## Landing Page

The landing page is implemented under `apps/edu-plus/src/app/(Landing)/` and
features:

- Hero section positioning X Management System as a unified education platform
- Campus hierarchy visualization (institutions, colleges, programs, classes)
- Feature grid: academic analytics, course & student management, role-based
  access
- Call-to-action for trial signup or dashboard exploration

Components live in `apps/edu-plus/src/components/landing/` and the shared UI kit
under `apps/edu-plus/src/components/ui/`.

---

## Contributing

Contributions and improvements are welcome. If you plan to make larger changes,
consider opening an issue or discussion first to align on direction.

---

## License

This project is currently closed-source for internal use. Update this section if
you decide to publish it under an open-source license.
