/**
 * Interfaz para datos de registro de usuario
 * Representa la información requerida para registrar una nueva cuenta de usuario
 */
export interface SignUp {
	/** Nombre completo del usuario */
	name: string
	/** Dirección de correo electrónico del usuario */
	email: string
	/** Contraseña del usuario */
	password: string
}