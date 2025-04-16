import { Router } from 'express';
import { body } from 'express-validator';
import { ContactController } from '../controllers/ContactController';
import { handleInputErrors } from '../middleware/validation';

const router = Router();

// Obtener todos los contactos
router.get('/', ContactController.getAllContacts);

// Obtener un contacto por ID
router.get('/:id', ContactController.getContactById);

// Crear un nuevo contacto
router.post(
    '/',
    body('contactName').notEmpty().withMessage('Por favor, proporciona el nombre del contacto'),
    body('contactEmail').isEmail().withMessage('Por favor, proporciona un correo electrónico válido'),
    body('contactPhones')
        .custom(value => Array.isArray(value) || typeof value === 'string')
        .withMessage('El teléfono debe ser uno o más'),
    body('contactAddress')
        .custom(value => Array.isArray(value) || typeof value === 'object')
        .withMessage('La dirección debe ser uno o más'),
    handleInputErrors,
    ContactController.createContact
);

// Actualizar un contacto existente
router.put('/:id', ContactController.updateContact);

// Eliminar un contacto
router.delete('/:id', ContactController.deleteContact);

export default router;