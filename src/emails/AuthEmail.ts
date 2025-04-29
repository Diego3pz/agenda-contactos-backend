import { sendEmail } from "../config/brevoemail";

interface IEmail {
    email: string
    name: string
    token: string
}

export class AuthEmail {
    static sendConfirmationEmail = async (user: IEmail) => {
        console.log('Enviando email de confirmación a:', user.email);
        console.log('Token de confirmación:', user.token);
        

        const emailData = {
             sender: { name: 'Agenda_Contactos', email: 'di3goDev.com' },
             to: [{ email: user.email, name: user.name }],
             subject: 'Agenda_Contactos - Confirma tu cuenta',
             htmlContent: `
                <html>
                    <body>
                        <p>Hola: ${user.name}, has creado tu cuenta en Agenda_Contactos, ya casi está todo listo, solo debes confirmar tu cuenta.</p>
                        <p>Visita el siguiente enlace:</p>
                        <a href="https://example.com/auth/confirm-account">Confirmar cuenta</a>
                        <p>Ingresa el código: <b>${user.token}</b></p>
                        <p>Este token expira en 10 minutos.</p>
                    </body>
                </html>
            `,
            replyTo: { email: 'admin@di3goDev.com', name: 'Di3goDev Support' },
            headers: { 'X-Custom-Header': 'custom-value' },
            params: { token: user.token, name: user.name },
        }

        await sendEmail(emailData);
    };

    // static sendPasswordResetToken = async ( user : IEmail ) => {
    //     const info = await transporter.sendMail({
    //         from: 'UpTask <admin@uptask.com>',
    //         to: user.email,
    //         subject: 'UpTask - Reestablece tu password',
    //         text: 'UpTask - Reestablece tu password',
    //         html: `<p>Hola: ${user.name}, has solicitado reestablecer tu password.</p>
    //             <p>Visita el siguiente enlace:</p>
    //             <a href="${process.env.FRONTEND_URL}/auth/new-password">Reestablecer Password</a>
    //             <p>E ingresa el código: <b>${user.token}</b></p>
    //             <p>Este token expira en 10 minutos</p>
    //         `
    //     })

    //     console.log('Mensaje enviado', info.messageId)
    // }
}