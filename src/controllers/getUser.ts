import { ResponseData } from '@/interfaces'
import { User } from '@/models'
import { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'

/**
 * Obtiene un usuario a partir de su identificador.
 *
 * Este controlador valida el `id` recibido por parámetro de ruta, consulta la
 * base de datos y devuelve un objeto con el estado de la operación, el mensaje
 * y el usuario encontrado.
 *
 * @param req - Solicitud HTTP entrante que contiene el `id` en `req.params`.
 * @param res - Respuesta HTTP para devolver la información al cliente.
 * @returns {Promise<void>} No retorna un valor explícito, pero responde con JSON.
 */
export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    // Evita consultar la base de datos con un identificador con formato inválido.
    if (!isValidObjectId(id)) {
      const message: ResponseData = {
        message: 'Identificador de usuario inválido',
        success: false,
        error: true,
      }

      res.status(400).json(message)
      return
    }

    // Busca el usuario por su identificador.
    const user = await User.findById(id)

    if (!user) {
      const message: ResponseData = {
        message: 'Usuario no encontrado',
        success: false,
        error: true,
      }

      res.status(404).json(message)
      return
    }

    const message: ResponseData<typeof user> = {
      message: 'Usuario',
      data: user,
      success: true,
      error: false,
    }

    // Envía la respuesta exitosa con el usuario encontrado.
    res.json(message)
  } catch (error) {
    const message: ResponseData = {
      message: error instanceof Error ? error.message : String(error),
      success: false,
      error: true,
    }

    // Devuelve el error en caso de que la consulta falle.
    res.status(400).json(message)
  }
}
