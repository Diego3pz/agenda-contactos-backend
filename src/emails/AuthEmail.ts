import { sendEmail } from "../config/brevoemail";

interface IEmail {
    email: string;
    name: string;
    token: string;
}

export class AuthEmail {
    static sendConfirmationEmail = async (user: IEmail) => {

        const emailData = {
            sender: { name: 'Agenda_Contactos', email: 'di3godevpc@gmail.com' },
            to: [{ email: user.email, name: user.name }],
            subject: 'Agenda_Contactos - Confirma tu cuenta',
            htmlContent: `
                <html>
                    <body>
                        <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); overflow: hidden;">
                            <div style="background-color: #4CAF50; color: #ffffff; padding: 20px; text-align: center;">
                                <h1 style="margin: 0;">Agenda Contactos Di3goDev</h1>
                            </div>
                            <div style="padding: 20px; color: #333333;">
                                <p style="font-size: 16px;">Hola <b>${user.name}</b>.</p>
                                <p style="font-size: 16px;">Has creado tu cuenta en <b>Agenda Contactos</b>. Ya casi está todo listo, solo debes confirmar tu cuenta.</p>
                                <p style="font-size: 16px;">Haz clic en el siguiente enlace para confirmar tu cuenta:</p>
                                <div style="text-align: center; margin: 20px 0;">
                                    <a href="${process.env.FRONTEND_URL}/auth/confirm-account" style="background-color: #4CAF50; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px;">Confirmar cuenta</a>
                                </div>
                                <p style="font-size: 16px;">Y utiliza el siguiente código:</p>
                                <p style="font-size: 18px; font-weight: bold; text-align: center; color: #4CAF50;">${user.token}</p>
                                <p style="font-size: 14px; color: #666666;">Este token expira en 10 minutos.</p>
                            </div>
                            <div style="background-color: #f4f4f9; color: #666666; text-align: center; padding: 10px; font-size: 12px;">
                                <p style="margin: 0;">Agenda Contactos Di3goDev &copy; 2025</p>
                            </div>
                        </div>
                    </body>
                </html>
            `,
        };

        await sendEmail(emailData);
    };

    static sendPasswordResetToken = async (user: IEmail) => {
        const emailData = {
            sender: { name: 'Agenda_Contactos', email: 'di3godevpc@gmail.com' },
            to: [{ email: user.email, name: user.name }],
            subject: 'Agenda_Contactos - Recuperar contraseña',
            htmlContent: `
                <html>
                    <body>
                        <p>Hola: ${user.name}, has solicitado recuperar tu contraseña en Agenda_Contactos.</p> 
                        <p>Visita el siguiente enlace:</p>
                        <a href="${process.env.FRONTEND_URL}/auth/reset-password">Recuperar contraseña</a>
                        <p>Ingresa el código: <b>${user.token}</b></p>
                        <p>Este token expira en 10 minutos.</p>
                    </body>
                </html>
            `,
        };

        await sendEmail(emailData);
    }
}


