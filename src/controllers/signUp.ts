import { ResponseData, SignUp, UserDb } from '@/interfaces'
import { User } from '@/models'
import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'

/**
 * Registra un usuario nuevo en la aplicación.
 *
 * Valida los datos mínimos, evita duplicar el correo electrónico y almacena la
 * contraseña cifrada. La contraseña nunca se incluye en la respuesta.
 *
 * @param req - Solicitud HTTP con los datos del usuario en `req.body`.
 * @param res - Respuesta HTTP para devolver el resultado del registro.
 * @returns {Promise<void>} No retorna un valor explícito, pero responde con JSON.
 */
export const signUpController = async (req: Request, res: Response) => {
	try {
		const { name, email, password } = req.body as SignUp

    if (!name.trim()) throw new Error('El nombre es obligatorio')

    if (!email.trim()) throw new Error('El correo electrónico es obligatorio')

    if (!password.trim()) throw new Error('La contraseña es obligatoria')

		const user = await User.findOne({ email })

    if (user) throw new Error('El usuario ya existe.')

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

		if (!hashedPassword) throw new Error('Error al cifrar la contraseña')

    const payload: UserDb = { ...req.body, role: 'GENERAL',  password: hashedPassword }
    const newUser = new User(payload)
    const savedUser = await newUser.save()

    const message: ResponseData<UserDb> = {
      message: 'Usuario registrado',
      data: savedUser,
      success: true,
      error: false,
    }

    res.status(201).json(message)
	} catch (error) {
		const message: ResponseData = {
			message: error instanceof Error ? error.message : String(error),
			success: false,
			error: true,
		}

		res.status(400).json(message)
	}
}
