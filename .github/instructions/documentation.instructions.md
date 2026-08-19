---
applyTo: "src/**/*.ts"
---

# Code Documentation (TSDoc)

These instructions define how to document this backend using TSDoc comments. **All code documentation text must be written in Spanish**, even when code identifiers, types, and keywords are in English.

## General Rules

- Write documentation with `/** ... */` blocks (TSDoc); never use `//` to describe the intent of an exported symbol.
- Write the documentation in Spanish, using complete sentences that end with a period.
- Be concise: one or two sentences are usually enough. Use `@remarks` only for details that do not fit in the main description.
- Do not document the obvious. If the symbol name already explains everything, avoid repeating it; document the rationale, constraints, or non-obvious behavior.
- Every file in `src/models/`, `src/controllers/`, and `src/interfaces/` that exports a public symbol (schema, model, interface, or function/controller) must have corresponding TSDoc documentation.

## Mongoose Schemas and Models (`src/models/`)

- Document the schema (`Schema`) with a description of the persisted entity it represents. Use `@remarks` to explain relevant constraints: required fields, default values, uniqueness, relationships (`ref`) to other models, and so on.
- Document each schema field with a one-line TSDoc comment immediately above its definition.
- Document the model (`model(...)`) by stating which collection it belongs to and link to the schema with `{@link schemaName}`.

```ts
/**
 * Esquema de persistencia de los usuarios de la aplicación.
 *
 * @remarks
 * Los campos `name`, `email`, `password` y `role` son obligatorios. El correo
 * electrónico debe ser único y `profilePic` puede omitirse, en cuyo caso se
 * almacena como una cadena vacía.
 */
const userSchema = new Schema({
  /** Nombre visible del usuario. */
  name: { type: String, required: true },
  /** Dirección de correo electrónico única del usuario. */
  email: { type: String, required: true, unique: true },
}, { timestamps: true })

/**
 * Modelo Mongoose utilizado para consultar y modificar usuarios.
 *
 * @remarks
 * Está asociado a la colección `users` y se construye a partir de
 * {@link userSchema}.
 */
const User = model('User', userSchema)
```

## Shared Interfaces and Types (`src/interfaces/`)

- Document the interface or type with a description of what it represents.
- Document each property with a one-line comment above it that states its purpose, especially when the name is not self-explanatory or the property is optional for a specific reason.
- If the type is generic, such as `ResponseData<T>`, document the type parameter with `@typeParam`.

```ts
/**
 * Forma estándar de las respuestas de la API.
 *
 * @typeParam T - Tipo de los datos devueltos en `data` cuando la operación es exitosa.
 */
export interface ResponseData<T = unknown> {
  /** Mensaje descriptivo del resultado de la operación. */
  message: string
  /** Datos devueltos cuando la operación fue exitosa. */
  data?: T
  /** Indica si la operación se completó correctamente. */
  success: boolean
  /** Indica si ocurrió un error durante la operación. */
  error: boolean
}
```

## Controllers (`src/controllers/`)

- Document each exported controller with a description of what the endpoint does (which resource it reads or modifies) and, when applicable, the HTTP method and route it is intended to handle.
- Use `@param` for `req` and `res` only when they provide relevant information, such as expected `req.params`, `req.body`, or `req.query` values. Omit them for standard Express handlers with no relevant input data.
- Use `@returns` to describe the response shape (`ResponseData<T>`) when it is not evident from the type.
- Mention relevant error cases in `@remarks` when error handling differs from the project's standard generic try/catch.

```ts
/**
 * Obtiene todos los usuarios registrados en la base de datos.
 *
 * @returns Una respuesta {@link ResponseData} con la lista de usuarios en `data`.
 */
export const getUsers = async (_: Request, res: Response) => {
  // ...
}
```

## General Functions and Utilities

- Document every exported function outside models, interfaces, and controllers with a description, `@param` for each parameter, and `@returns` when the function returns a value.
- Use `@throws` when the function may throw an expected exception that callers must handle.

```ts
/**
 * Calcula el precio total de un carrito a partir de sus productos.
 *
 * @param items - Productos del carrito con su cantidad y precio unitario.
 * @returns El monto total en la misma moneda que los precios de entrada.
 */
```

## What Not to Document

- Do not add TSDoc to local variables, non-exported internal functions, or self-explanatory code without meaningful details.
- Do not use comments that merely repeat the symbol name without adding information. For example, avoid `/** El nombre. */` for a field named `name` when there is nothing else to clarify, unless the project already follows that convention, as it does for Mongoose schemas.
- Do not leave empty TSDoc blocks or placeholders such as `/** TODO */`.
