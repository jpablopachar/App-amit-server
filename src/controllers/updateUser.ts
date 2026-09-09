import { ResponseData, UserDb } from '@/interfaces'
import { User } from '@/models'
import { Request, Response } from 'express'

/**
 * Extiende la solicitud autenticada con el identificador del usuario que inició sesión.
 *
 * @remarks
 * Este campo se inyecta por middleware de autenticación y se usa para validar
 * el contexto del usuario actual durante la actualización del perfil.
 */
interface AuthRequest extends Request {
  userId?: string
}

/**
 * Actualiza los datos de un usuario en la base de datos.
 *
 * @remarks
 * Acepta el identificador del usuario a modificar y los campos opcionales
 * `name`, `email` y `role`; solo incorpora en el payload los valores definidos
 * para evitar sobrescribir campos con contenido vacío.
 *
 * @param req - Solicitud autenticada con el `userId` del usuario en sesión y la
 * información del usuario a actualizar en `req.body`.
 * @param res - Respuesta HTTP donde se devuelve el resultado de la operación.
 * @returns Responde con un objeto {@link ResponseData} con el usuario actualizado
 * cuando la operación es exitosa o con un mensaje de error si falla.
 */
export const updateUserController = async (req: AuthRequest, res: Response) => {
  try {
    const sessionUser = req.userId

    const { userId, name, email, role } = req.body as UserDb

    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    }

    await User.findById(sessionUser)

    const updatedUser = await User.findByIdAndUpdate(userId, payload, {
      new: true,
    })

    const message: ResponseData<unknown> = {
      message: 'Usuario actualizado',
      data: updatedUser,
      success: true,
      error: false,
    }

    res.status(200).json(message)
  } catch (error) {
    const message: ResponseData = {
      message: error instanceof Error ? error.message : String(error),
      success: false,
      error: true,
    }

    res.status(400).json(message)
  }
}
