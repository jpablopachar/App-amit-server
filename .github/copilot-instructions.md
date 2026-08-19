## Scope

These instructions apply to the `App-amit-server` backend, not to the neighboring React client.

## Project

- Strict TypeScript with ESNext modules, Express 5, Mongoose, and Vite.
- Run commands from `App-amit-server`.
- Available commands: `npm run dev`, `npm run build`, and `npm run preview`.
- `npm run build` runs `tsc` and then `vite build`. There are no test, lint, or start scripts.
- The project is in the scaffolding stage: `src/main.ts` does not yet initialize Express, MongoDB, middleware, or routes.

## Conventions

- Use the aliases defined in `tsconfig.json` (`@/`, `@interfaces/`, `@models/`, `@controllers/`) instead of relative paths.
- Keep one model, controller, or interface per file and update the corresponding folder's `index.ts` with a barrel export.
- Mongoose models use `{ timestamps: true }`, and their TSDoc comments are written in Spanish.
- Controllers are async Express handlers and respond with `ResponseData<T>` from `src/interfaces/response.ts`.
- Use `ResponseData<unknown>` by default for responses without data; avoid `never` unless there is an explicit type-related reason.
- Preserve `strict` and TypeScript's strict checks; do not solve errors with `any`.
- Run `npm run build` before finishing backend changes.

## Current State

Models exist in `src/models/`, along with the `src/controllers/getUsers.ts` controller and the shared interface in `src/interfaces/`. The `@routes/*` and `@middlewares/*` aliases are configured, but those folders do not exist yet.
