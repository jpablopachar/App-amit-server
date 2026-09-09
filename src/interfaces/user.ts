/**
 * Interfaz que representa un usuario en la aplicación.
 */
export interface UserDb {
  /**
   * Identificador único del usuario.
   */
  userId?: string

  /**
   * Nombre del usuario.
   */
  name: string

  /**
   * Correo electrónico del usuario.
   */
  email: string

  /**
   * Contraseña del usuario.
   */
  password?: string

  /**
   * Rol del usuario en la aplicación.
   */
  role: string
}