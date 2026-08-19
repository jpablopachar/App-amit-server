import { ResponseData } from '@/interfaces'
import { User } from '@/models'
import { Request, Response } from 'express'

/**
 * Obtiene la lista de todos los usuarios registrados.
 *
 * Este controlador consulta la base de datos y devuelve un objeto
 * con el estado de la operación, el mensaje y los usuarios encontrados.
 *
 * @param _req - Solicitud HTTP entrante (no se utiliza en esta operación).
 * @param res - Respuesta HTTP para devolver la información al cliente.
 * @returns {Promise<void>} No retorna un valor explícito, pero responde con JSON.
 */
export const getUsers = async (_: Request, res: Response) => {
  try {
    // Busca todos los usuarios en la colección.
    const users = await User.find()

    const message: ResponseData<typeof users> = {
      message: 'Usuarios',
      data: users,
      success: true,
      error: false,
    }

    // Envía la respuesta exitosa con la lista de usuarios.
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
