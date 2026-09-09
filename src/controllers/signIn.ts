import { ResponseData, SignIn } from '@/interfaces'
import { User } from '@/models'
import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'

/**
 * Inicia sesión de un usuario con correo y contraseña.
 *
 * Valida las credenciales, compara la contraseña almacenada y, si son correctas,
 * emite un token JWT que se devuelve en la respuesta y se guarda en una cookie segura.
 *
 * @returns Una respuesta HTTP con el token en `data` en caso de éxito o un mensaje de error en `message` si las credenciales son inválidas.
 * @remarks Si el correo o la contraseña están vacíos, el usuario no existe, la contraseña es incorrecta o falla la firma del JWT, la operación responde con un error 400.
 */
export const signInController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as SignIn

    if (!email.trim()) throw new Error('El correo electrónico es obligatorio')

    if (!password.trim()) throw new Error('La contraseña es obligatoria')

    const user = await User.findOne({ email })

    if (!user) throw new Error('El usuario no existe.')

    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) throw new Error('La contraseña es incorrecta')

    const payload = { id: user._id, email: user.email }

    const token = sign(payload, process.env['JWT_SECRET'] as string, {
      expiresIn: 60 * 60 * 8,
    })

    const tokenOption = { httpOnly: true, secure: true }

    const message: ResponseData<string> = {
      message: 'Inicio de sesión exitoso',
      data: token,
      success: true,
      error: false,
    }

    res.cookie('token', token, tokenOption).status(200).json(message)
  } catch (error) {
    const message: ResponseData = {
      message: error instanceof Error ? error.message : String(error),
      success: false,
      error: true,
    }

    res.status(400).json(message)
  }
}
