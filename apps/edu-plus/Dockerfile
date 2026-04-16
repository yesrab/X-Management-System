FROM node:24-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate

# --- Install dependencies ---
FROM base AS deps
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/edu-plus/package.json apps/edu-plus/
COPY libs/prisma-client/package.json libs/prisma-client/
RUN pnpm install --frozen-lockfile

# --- Build ---
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm dlx prisma generate
RUN cd apps/edu-plus && npx next build

# --- Production ---
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/apps/edu-plus/.next/standalone ./
COPY --from=builder /app/apps/edu-plus/.next/static ./apps/edu-plus/.next/static
COPY --from=builder /app/apps/edu-plus/public ./apps/edu-plus/public

EXPOSE 3000
CMD ["node", "apps/edu-plus/server.js"]
