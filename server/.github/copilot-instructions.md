# Copilot Instructions for AI Agents

## Project Overview
- This is an Express.js backend for a form management system, using TypeScript and Drizzle ORM for PostgreSQL.
- The codebase is modular, with clear separation of concerns:
  - `controllers/`: Route handlers for forms, fields, integrations, respondents, responses, and workspaces.
  - `services/`: Business logic for each domain, including integrations (Google Sheets, Notion).
  - `db/schema/`: Database schema definitions for all entities.
  - `middlewares/`: Custom Express middlewares (e.g., authentication).
  - `routes/`: Route definitions, mapping endpoints to controllers.
  - `queue/`: BullMQ-based job queues for async/background tasks.
  - `redis/`: Redis configuration for caching/queues.
  - `utils/`: Shared utilities (error handling, logging, validation, short ID generation).

## Build & Run
- **Development:**
  - Use `pnpm dev` or `npm run dev` to start the server with hot-reload (nodemon + tsx).
  - Entry point: `src/server.ts` (see `nodemon.json` for config).
- **Production Build:**
  - Run `pnpm build` or `npm run build` (uses `tsup` for bundling TypeScript).
  - Start with `pnpm start` or `npm start` (runs compiled JS from `dist/`).

## Data Flow & Architecture
- API requests enter via `routes/`, handled by corresponding `controllers/`, which delegate to `services/` for business logic.
- Database access is via Drizzle ORM, with schemas in `db/schema/` and config in `db/config.ts`.
- Integrations (Google Sheets, Notion) are isolated in `services/integrations/` and `controllers/integrations/`.
- Background jobs use BullMQ (`queue/queues.ts`), with Redis for persistence (`redis/config.ts`).
- Errors are handled via custom middleware and utility classes (`utils/apiError.ts`, `middlewares/authMiddleware.ts`).

## Conventions & Patterns
- **TypeScript strict mode** is enforced (`tsconfig.json`).
- **Async error handling** uses `utils/asynHandler.ts` for wrapping route handlers.
- **Validation** is done with Zod and custom logic in `utils/validations.ts`.
- **Short IDs** for entities are generated via `utils/shortIDgen.ts`.
- **Logging** uses Winston (`utils/logger.ts`).
- **Swagger** API docs are served via `swagger.yaml` and `swagger-ui-express`.
- **Environment variables** are loaded with `dotenv`.

## Integration Points
- **Google Sheets**: See `services/integrations/google/` and `controllers/integrations/google.sheets.controller.ts`.
- **Notion**: See `services/integrations/notion/`.
- **Redis**: Used for BullMQ queues and caching.
- **Swagger**: API documentation at `/api-docs` (see `swagger.yaml`).

## Examples
- To add a new form field type, update `db/schema/formfields.ts`, then extend logic in `controllers/form.field.controller.ts` and `services/formField.services.ts`.
- To add a new integration, create a new service in `services/integrations/`, add a controller, and update routes.

## Testing & Debugging
- No test framework is currently set up (see `package.json`). Add tests in `src/__tests__/` and update scripts as needed.
- Debug by running in dev mode and inspecting logs (`utils/logger.ts`).

## Key Files
- `src/server.ts`: Main server entry point
- `src/app.ts`: Express app setup
- `db/schema/`: Database models
- `services/`: Business logic
- `controllers/`: API endpoints
- `queue/queues.ts`: Background job setup
- `utils/`: Shared helpers

---

_If any section is unclear or missing important project-specific details, please provide feedback to improve these instructions._
