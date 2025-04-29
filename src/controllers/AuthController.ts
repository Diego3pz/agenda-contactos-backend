import type { Request, Response } from 'express';
import User from '../models/User';
import { hashPassword } from '../utils/auth';
import Token from '../models/Token';
import { generateToken } from '../utils/token';
import { AuthEmail } from '../emails/AuthEmail';


export class AuthController {

    static createAccount = async (req: Request, res: Response) => {
        try {
            const { password, email } = req.body

            // Verificar si el usuario ya existe
            const userExists = await User.findOne({ email })
            if (userExists) {
                const error = new Error('El usuario ya existe')
                res.status(409).json({ error: error.message })
                return
            }

            // Crea el nuevo usuario
            const user = new User(req.body)

            // Hash password
            user.password = await hashPassword(password)

            // Generar token de verificación
            const token = new Token()
            token.token = generateToken()
            token.user = user.id

            // Enviar el email de confirmación
            await AuthEmail.sendConfirmationEmail({
                email: user.email,
                name: user.name,
                token: token.token,
            });
            // Guardar el usuario y el token en la base de datos

            await Promise.allSettled([
                user.save(),
                token.save()
            ])

            res.status(201).json({ message: 'Usuario creado correctamente' })
        } catch (error) {
            res.status(500).json({ message: 'Error interno del servidor' })

        }
    }
}