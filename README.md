# Agenda de Contactos - Backend

Este es el backend de la aplicación **Agenda de Contactos**, desarrollado con **React**, **TypeScript** y **Vite**. Permite a los usuarios gestionar sus contactos, autenticarse y realizar operaciones relacionadas con su perfil.

---

## **Tecnologías utilizadas**

- **Framework**: Express
- **Base de Datos**: MongoDB
- **ORM/ODM**: Mongoose
- **Autenticación**: JSON Web Tokens (JWT)
- **Validación de Entradas**: Express Validator
- **Gestión de Variables de Entorno**: dotenv
- **CORS**: Configuración personalizada con `cors`
- **Envío de Correos**: Brevo (Sendinblue API)
- **Hashing de Contraseñas**: bcrypt
- **Logger**: Morgan
- **Colores en Consola**: Colors


---

## **Requisitos previos**

- Node.js (versión 16 o superior)
- npm o yarn
- MongoDB (local o en la nube)

---

## **Instalación**

1. Clona el repositorio:
   ```bash
   git clone <https://github.com/Diego3pz/agenda-contactos-backend/>
   cd Agenda_Backend
    ```
2. Instalacion de dependencias:
   ```bash
   npm install
    ```
3. Configura las variables de entorno:
   ```bash
   DATABASE_URL=tu_mongoDB
   JWT_SECRET=tu_secreto
   BREVO_API_KEY==tu_api_key
   FRONTEND_URL=http://localhost:5173
    ```
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   "Probar API" npm run dev:api
    ```
## **Frontend del proyecto**
- https://github.com/Diego3pz/agenda-contactos-frontend/
