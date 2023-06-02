import { Schema, model, Document, ObjectId } from "mongoose";

export interface IProfile extends Document {
   name: string;
   lastname: string;
   profileImage: string;
   coutry: string;
   city: string;
   tlf: string;
   user: ObjectId;
}

const profileSchema = new Schema({
   name: { type: String, required: true },
   lastname: { type: String, required: true },
   profileImage: { type: String, required: true },
   coutry: { type: String, required: true },
   city: { type: String, required: true },
   tlf: { type: String, required: true },
   user: { type: Schema.Types.ObjectId, required: true },
});

export default model<IProfile>("Profile", profileSchema);
