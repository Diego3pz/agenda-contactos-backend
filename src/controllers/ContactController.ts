import { Request, Response } from 'express';
import Contact from '../models/Contact';

export class ContactController {

    // Obtener todos los contactos
    static getAllContacts = async (req: Request, res: Response) => {
        try {
            const contacts = await Contact.find({
                $or: [
                    { owner: { $in: req.user.id } }
                ]
            });
            res.status(200).json(contacts);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al obtener los contactos' });
        }
    };

    // Obtener un contacto por ID
    static getContactById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const contact = await Contact.findById(id);
            if (!contact) {
                const error = new Error('Contacto no encontrado');
                res.status(404).json({ error: error.message });
                return;
            }

            // Verificar si el contacto pertenece al usuario autenticado
            if (contact.owner.toString() !== req.user.id.toString()) {
                const error = new Error('Accion no valida');
                res.status(404).json({ error: error.message });
                return;
            }

            res.status(200).json(contact);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al obtener el contacto' });
        }
    };

    // Crear un nuevo contacto
    static createContact = async (req: Request, res: Response) => {
        const contact = new Contact(req.body);

        // Asignar el propietario del contacto al usuario autenticado
        contact.owner = req.user.id

        try {
            await contact.save();
            res.send('Contacto creado correctamente');
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al crear el contacto' });
        }
    };

    // Actualizar un contacto existente
    static updateContact = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const contact = await Contact.findById(id);
            if (!contact) {
                const error = new Error('Contacto no encontrado');
                res.status(404).json({ error: error.message });
                return;
            }

            // Verificar si el contacto pertenece al usuario autenticado
            if (contact.owner.toString() !== req.user.id.toString()) {
                const error = new Error('Solo el propietario puede actualizar el contacto');
                res.status(404).json({ error: error.message });
                return;
            }

            contact.contactName = req.body.contactName || contact.contactName;
            contact.contactEmail = req.body.contactEmail || contact.contactEmail;
            contact.contactPhones = req.body.contactPhones || contact.contactPhones;
            contact.contactAddress = req.body.contactAddress || contact.contactAddress;

            await contact.save();
            res.send('Contacto actualizado correctamente');
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al actualizar el contacto' });
        }
    };

    // Eliminar un contacto
    static deleteContact = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const contact = await Contact.findById(id);
            if (!contact) {
                const error = new Error('Contacto no encontrado');
                res.status(404).json({ error: error.message });
                return;
            }

            // Verificar si el contacto pertenece al usuario autenticado
            if (contact.owner.toString() !== req.user.id.toString()) {
                const error = new Error('Solo el propietario puede eliminar el contacto');
                res.status(404).json({ error: error.message });
                return;
            }

            await contact.deleteOne();
            res.send('Contacto eliminado correctamente');
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al eliminar el contacto' });
        }
    };
}