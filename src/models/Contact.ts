import mongoose, { Schema, model, Document, PopulatedDoc } from "mongoose";
import { IUser } from "./User";

interface IAddress {
    street: string;
    city: string;
    postalCode: string;
}

interface IContact extends Document {
    contactName: string;
    contactEmail: string;
    contactPhones: string[];
    contactAddress: IAddress[];
    createdAt: Date;
    updatedAt: Date;
    owner: PopulatedDoc<IUser & Document>
}

const AddressSchema = new Schema<IAddress>({
    street: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    postalCode: {
        type: String,
        required: true,
        trim: true,
    },
});

const ContactSchema = new Schema<IContact>(
    {
        contactName: {
            type: String,
            required: true,
            trim: true,
        },
        contactEmail: {
            type: String,
            required: true,
            trim: true,
        },
        contactPhones: {
            type: [String],
            required: true,
            trim: true,
        },
        contactAddress: {
            type: [AddressSchema],
            required: false,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Contact = model<IContact>('Contact', ContactSchema);

export default Contact;