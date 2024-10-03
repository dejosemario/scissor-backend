# syntax=docker/dockerfile:1

FROM node:16.14.2-apline AS base

WORKDIR /app

COPY [ "package.json", "pnpm-lock.yaml", "./" ]

FROM base AS dev
ENV NODE_ENV=dev
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
CMD ["pnpm", "start:dev"]

FROM base AS test
ENV NODE_ENV=test
CMD ["pnpm", "test"]

FROM base AS test-cov
CMD ["pnpm", "test:cov"]

FROM base AS test-watch
ENV GIT_WORK_TREE=/app GIT_DIR=/app/.git
RUN apk add --no-cache git
CMD ["pnpm", "test:watch"]

FROM base AS prod
ENV NODE_ENV=production
RUN pnpm install -g pnpm && pnpm install --frozen-lockfile --prod
COPY . .
RUN pnpm install -g @nestjs/cli 
RUN pnpm build
CMD ["pnpm", "start:prod"] 