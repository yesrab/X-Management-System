FROM node:24-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate

# --- Install dependencies ---
FROM base AS deps
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/edu-core/package.json apps/edu-core/
COPY libs/prisma-client/package.json libs/prisma-client/
RUN pnpm install --frozen-lockfile

# --- Build ---
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm dlx prisma generate
RUN cd apps/edu-core && npx nest build

# --- Production ---
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/apps/edu-core/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/libs/prisma-client/src/generated ./libs/prisma-client/src/generated

EXPOSE 3001
CMD ["node", "dist/main.js"]
