# BEAM — Nuxt 4 furniture store

## Quick start
```bash
npm install
cp .env.example .env        # edit as needed
npm run db:up                # docker: postgres + minio
npm run migrate              # apply Drizzle SQL migrations
npm run seed                 # test data
npm run dev                  # http://localhost:3000
```

## Dev commands
| Command | Purpose |
|---------|---------|
| `npm run dev` | dev server |
| `npm run test` | Vitest (single: `npx vitest run <path>`) |
| `npm run lint` | ESLint; `lint:fix` to auto-fix |
| `npm run db:generate` | Drizzle Kit: generate SQL from schema changes |
| `npm run migrate` | apply migrations (`tsx --env-file=.env server/db/migrate.ts`) |
| `npm run seed` | seed DB (`tsx --env-file=.env server/db/seed.ts`) |
| `npm run db:studio` | Drizzle Studio GUI |
| `npm run build` / `preview` | production build / local preview |

**Order when writing DB changes:** `db:generate` → `migrate` → `seed` (re-run seed after schema changes to refresh test data).

## Architecture

**Nuxt 4 / Nitro** — file-based routing on both client and server.

- `server/api/` — thin Nitro route handlers
- `server/services/` — business logic + DB queries
- `server/validation/` — Zod schemas per entity
- `server/db/` — Drizzle schema, migrations, seed
- `server/utils/` — `respond.ts` (response wrappers + `defineApiHandler`), S3 client, auth helpers
- `shared/types.ts` — shared types auto-imported on client and server
- `app/` — Vue SFC pages, components, composables, SCSS

## API conventions
- All responses: `{ ok: true, data }` or `{ ok: false, error: { code, message } }`
- `GET` = public. `POST/PUT/DELETE` = admin session required (enforced by `defineApiHandler`)
- Route metadata + OpenAPI via `defineRouteMeta()`
- Validation via `readValidatedBody()` / `getValidatedRouterParams()` using Zod schemas
- Server path alias: `~~/server/...` and `~~/shared/...` (no relative `../../`)
- IDs are serial primary keys, aliased as `{resource}Id` in JS

## Key patterns
- Admin auth: scrypt password hash + h3 sealed session cookie (HttpOnly). Login at `POST /api/auth/login` with `ADMIN_PASSWORD` from env.
- Image upload: `POST /api/media/upload` (multipart, field `file`) → `{ src, alt }`. Use returned `src` in entity image fields.
- Delete category with products → 409 (RESTRICT FK).
- Errors before route entry (404 path, 405 method) use raw Nitro format, not `{ ok, ... }`.

## Testing
- Vitest with `@nuxt/test-utils` (environment: `nuxt`). Single test file: `app/composables/useGridPattern.test.ts`.
- No server/integration tests yet.

## Docker
- `db.docker-compose.yaml` for local infra only (npm run db:up/down).
- `docker-compose.yaml` for full stack (app + postgres + minio + auto-migrate).
- MinIO console: `http://localhost:9001` (minioadmin/minioadmin locally).

## Prettier
- Single quotes, no semicolons, trailingComma none, tabWidth 2.
- Format manually with Prettier (no pre-commit hook).
