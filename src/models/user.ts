import { Schema, model } from 'mongoose'

/**
 * Esquema de persistencia de los usuarios de la aplicación.
 *
 * @remarks
 * Los campos `name`, `email`, `password` y `role` son obligatorios. El correo
 * electrónico debe ser único y `profilePic` puede omitirse, en cuyo caso se
 * almacena como una cadena vacía. Mongoose gestiona automáticamente las
 * marcas de tiempo `createdAt` y `updatedAt` mediante la opción `timestamps`.
 */
const userSchema = new Schema({
  /** Nombre visible del usuario. */
  name: { type: String, required: true },
  /** Dirección de correo electrónico única del usuario. */
  email: { type: String, required: true, unique: true },
  /** Contraseña almacenada para la autenticación del usuario. */
  password: { type: String, required: true },
  /** URL o ruta de la imagen de perfil del usuario. */
  profilePic: { type: String, default: '' },
  /** Rol que determina los permisos del usuario. */
  role: { type: String, required: true },
}, { timestamps: true });

/**
 * Modelo Mongoose utilizado para consultar y modificar usuarios.
 *
 * @remarks
 * Está asociado a la colección `users` y se construye a partir de
 * {@link userSchema}.
 */
const User = model('User', userSchema);

export default User;