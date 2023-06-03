import { Schema, model, Document } from "mongoose";
import  bcrypt from "bcrypt";
import { ObjectId } from "mongoose";


export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    isProvider: boolean;    
    touristicDestinations: ObjectId[] ;
    profile: ObjectId | null;
    comparePassword: ()=>Promise<boolean>;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    isProvider:{
        type: Boolean,
        default: false,
        required: false,
    },
    profile: { type : Schema.Types.ObjectId, ref: "Profile",default:null },
    touristicDestinations: [{ type: Schema.Types.ObjectId, ref: "Destino" }],
   

}, { timestamps: true });

userSchema.pre<IUser>("save", async function(next) {
    const user = this;
    if (!user.isModified("password")) return next();

   const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};


    

export default model<IUser>("User", userSchema);