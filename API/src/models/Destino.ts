import { Schema, model, Document, ObjectId } from "mongoose";


export interface IDestino extends Document {
    name: string;
    description: string;
    price: number;
    image: string[];
    user: ObjectId
    createdAt: Date;
    updatedAt: Date;
}

const destinoSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: {type: Number, required: true},
    image: { type: Array, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });


export default model<IDestino>("Destino", destinoSchema);