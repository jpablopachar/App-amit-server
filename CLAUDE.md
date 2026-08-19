# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this backend repository.

## Project status

This is the backend (Express + MongoDB/Mongoose) for a MERN ecommerce app, in early scaffolding. `src/main.ts` (the server entry point) is currently empty; there is no running Express server, no routes, no middlewares, and no DB connection code yet. Only Mongoose models, one controller, and shared interfaces exist so far.

## Commands

```bash
npm run dev      # start Vite dev server
npm run build     # type-check (tsc) then build with Vite
npm run preview   # preview the Vite production build
```

There is no test runner, lint command, or `start` script configured yet.

Note: this is a Node/Express API, but it is built and served through **Vite** (see `index.html`, which loads `/src/main.ts` as a module entry point) rather than a typical `ts-node`/`nodemon` setup, even though `nodemon` is a devDependency.

Run commands from this directory (`App-amit-server`). There is currently no `vite.config.ts`; Vite uses its defaults.

## Architecture

- **Language/runtime**: TypeScript (ESNext modules, `strict` mode fully enabled, including `noUncheckedIndexedAccess` and `noPropertyAccessFromIndexSignature`) on Express 5 + Mongoose.
- **Path aliases** (`tsconfig.json`): import via aliases, not relative paths:
  - `@/*` → `src/*`
  - `@interfaces/*` → `src/interfaces/*`
  - `@models/*` → `src/models/*`
  - `@controllers/*` → `src/controllers/*`
  - `@routes/*` → `src/routes/*` (directory not yet created)
  - `@middlewares/*` → `src/middlewares/*` (directory not yet created)
- **Models** (`src/models/`): `user.ts`, `product.ts`, `cart-product.ts`, each exporting a Mongoose model as default and re-exported centrally from `src/models/index.ts`. `cart-product.ts` links `User` and `Product` via `ObjectId` refs. All schemas use `{ timestamps: true }`. Doc comments on schemas are written in Spanish (TSDoc-style `/** ... */`); follow this convention for new models.
- **Controllers** (`src/controllers/`): one file per handler (e.g. `getUsers.ts`), re-exported via `src/controllers/index.ts` using `export * from './x'`. Controllers are async Express handlers that catch errors and always respond with the shared `ResponseData<T>` shape (see below) — success as `res.json(...)`, failure as `res.status(400).json(...)`.
- **Interfaces** (`src/interfaces/`): shared types, re-exported via `src/interfaces/index.ts` the same barrel-export pattern as controllers/models. `ResponseData<T = unknown>` (`src/interfaces/response.ts`) is the standard API response envelope: `{ message, data?, success, error }`. Use it for every controller response.
- **Barrel export pattern**: every subdirectory under `src/` has an `index.ts` that re-exports its siblings (`export * from './x'` or `export { default as X } from './x'`). When adding a new model/controller/interface file, add its export to the corresponding `index.ts`.
- **Current scope**: do not assume that aliases imply existing directories. `src/routes/` and `src/middlewares/` are not created yet; add them only when the feature requires them.
- **Implementation order for the backend**: when building the server, initialize Express in `src/main.ts`, add the MongoDB connection, then register middleware and routes. Do not describe these pieces as existing until they are implemented.
