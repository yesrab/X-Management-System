## X Management System

Unified management platform for schools, colleges, and universities. Manage
students, faculty, courses, and administration in one place – from enrollment
and attendance to grades and reporting.

The public landing page showcases the product story (hero, campus hierarchy,
feature grid, and CTA) and lives at the root route `/`.

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

- Next.js App Router (React, TypeScript)
- Tailwind CSS 4
- Prisma ORM + PostgreSQL
- pnpm for dependency management
- Radix UI + custom UI kit components

---

## Project Structure

Key folders (not exhaustive):

- [src/app/(Landing)](<src/app/(Landing)>) – marketing/landing experience (hero,
  hierarchy, features, CTA)
- [src/app/(access)](<src/app/(access)>) – auth flows (login, signup, OAuth)
- [src/app/(admin)](<src/app/(admin)>) – admin shell and dashboard entry
- [src/components](src/components) – shared UI (navigation, forms, landing
  components, theme)
- [prisma](prisma) – Prisma schema, migrations, and seed script
- [src/lib](src/lib) – utilities such as Prisma client, sessions, logging, and
  crypto helpers

---

## Prerequisites

- Node.js (recommended: current LTS)
- pnpm installed globally (`npm install -g pnpm`)
- PostgreSQL database (local or remote)

---

## Environment Setup

Create a `.env` file in the project root with at least:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB_NAME"
```

- The URL must point to a PostgreSQL database the app can migrate and
  read/write.
- In production, use a strong password and restrict network access to the
  database.

---

## Installation

Install dependencies with pnpm:

```bash
pnpm install
```

---

## Database & Prisma

Run migrations against your development database and generate the Prisma client:

```bash
pnpm dlx prisma migrate dev
pnpm dlx prisma generate
```

If you have a seed script configured (see [prisma/seed.ts](prisma/seed.ts)), you
can populate demo data with:

```bash
pnpm dlx prisma db seed
```

---

## Running the App (Development)

Start the Next.js dev server:

```bash
pnpm dev
```

Then open http://localhost:3000 in your browser.

- `/` – marketing landing page (hero, features, education-focused copy)
- `/access/login` – login experience
- `/access/signup` – signup experience
- `/admin/dashboard` – admin dashboard shell (requires appropriate session/auth
  setup)

---

## Build & Production

Create a production build:

```bash
pnpm build
```

This will apply any pending Prisma migrations and generate the Prisma client as
part of the build pipeline.

Start the production server (after `pnpm build`):

```bash
pnpm start
```

You can deploy this app to any environment that supports Node.js and provides a
PostgreSQL database. Ensure `DATABASE_URL` is configured in the environment.

---

## Scripts

Convenient scripts defined in [package.json](package.json):

- `pnpm dev` – run the development server
- `pnpm build` – run Prisma migrations/generation and build the app
- `pnpm start` – start the production server
- `pnpm lint` – run ESLint on the codebase

---

## Landing Page Overview

The landing page is implemented under [src/app/(Landing)](<src/app/(Landing)>)
and uses:

- Hero section that positions X Management System as a unified platform for
  schools, colleges, and universities
- Campus hierarchy visualization to explain how institutions, colleges,
  programs, and classes are modeled
- Feature grid highlighting academic analytics, course & student management, and
  role-based access
- Call-to-action encouraging institutions to start a trial or explore the
  dashboard

These sections are built with reusable components from
[src/components/landing](src/components/landing) and the shared UI kit under
[src/components/ui](src/components/ui).

---

## Contributing

Contributions and improvements are welcome. If you plan to make larger changes,
consider opening an issue or discussion first to align on direction.

---

## License

This project is currently closed-source for internal use. Update this section if
you decide to publish it under an open-source license.
