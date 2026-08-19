/**
 * Representa la estructura estándar de una respuesta HTTP de la API.
 *
 * @template T Tipo de dato contenido en la propiedad `data`.
 */
export interface ResponseData<T = unknown> {
  /**
   * Mensaje descriptivo del resultado de la operación.
   */
  message: string

  /**
   * Datos devueltos por la operación. Es opcional porque algunas respuestas
   * pueden indicar únicamente un estado o un mensaje.
   */
  data?: T

  /**
   * Indica si la operación se completó correctamente.
   */
  success: boolean

  /**
   * Indica si la respuesta contiene un error.
   */
  error: boolean
}