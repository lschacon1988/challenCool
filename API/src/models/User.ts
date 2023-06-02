import { Schema, model, Document } from "mongoose";
import  bcrypt from "bcrypt";
import { ObjectId } from "mongoose";


export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    isProvider: boolean;    
    touristicDestinations: ObjectId[];
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
        type: String,
        default: false,
        required: false,
    },
   

}, { timestamps: true });

userSchema.pre<IUser>("save", function(next) {
    const user = this;
    if (!user.isModified("password")) return next();

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) return next(error);
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};


    

export default model<IUser>("User", userSchema);