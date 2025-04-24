import { Request, Response } from 'express';
import Contact from '../models/Contact';

export class ContactController {

    // Obtener todos los contactos
    static getAllContacts = async (req: Request, res: Response): Promise<void> => {
        try {
            const contacts = await Contact.find();
            res.status(200).json(contacts);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al obtener los contactos' });
        }
    };

    // Obtener un contacto por ID
    static getContactById = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const contact = await Contact.findById(id);
            if (!contact) {
                const error = new Error('Contacto no encontrado');
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
    static createContact = async (req: Request, res: Response): Promise<void> => {
        const contact = new Contact(req.body);
        try {
            await contact.save();
            res.status(201).json({ message: 'Contacto creado correctamente', contact });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al crear el contacto' });
        }
    };

    // Actualizar un contacto existente
    static updateContact = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const contact = await Contact.findById(id);
            if (!contact) {
                const error = new Error('Contacto no encontrado');
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
    static deleteContact = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const contact = await Contact.findById(id);
            if (!contact) {
                const error = new Error('Contacto no encontrado');
                res.status(404).json({ error: error.message });
                return;
            }

            await contact.deleteOne();
            res.status(200).json({ message: 'Contacto eliminado correctamente' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al eliminar el contacto' });
        }
    };
}