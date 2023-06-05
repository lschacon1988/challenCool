import User, { IUser } from "../../models/User";
import jwt from "jsonwebtoken";
import config from "../config/config";
import Profile from "../../models/Profile";
import { passwordHash } from "../passwordHash";


export interface IUserManager{
   getAll(): Promise<IUser[]>;
   getById(userId: string): Promise<IUser | null>
   create(user: IUser): Promise<IUser | object>;
   update(id: string, user: IUser): Promise<IUser | object>;
   delete(id: string): Promise<IUser | object>;
   validateUser(email: string): Promise<IUser | null>;
   getUserProvider(userId: string): Promise<IUser | null>;
   createToken(user: IUser): string;

}

export default class UsersManager implements IUserManager{
   
   async getById(userId: string): Promise<IUser | null> {
      try {
         const user: IUser | null = await User.findById(userId)
            .populate("touristicDestinations")
            .populate("profile")
            .exec();
         if (!user) {
            throw new Error(`User not found`);
         }
         return user;
      } catch (err) {
         throw err;
      }
   }

   getAll = async (): Promise<IUser[]> => {
      return await User.find()
         .populate("touristicDestinations")
         .populate("profile")
         .exec();
   };

   

   async create(user: IUser): Promise<IUser | object> {
      try {
         const validateUser: IUser | null = await User.findOne({
            email: user.email,
         }).exec();

         if (!validateUser) {
            return await User.create(user);
         }

         throw new Error("User already exists");
      } catch (err) {
         throw err;
      }
   }

   async update(id: string, user: IUser): Promise<IUser | object> {
      try {
         let userPassword: IUser = user ;
         userPassword.password = await passwordHash(userPassword.password);
         const userUpdated = await User.findByIdAndUpdate(id, userPassword, {
            new: true,
         }).populate("profile").exec();
         if (!userUpdated) {
            throw new Error("User not found");
         }
         
         return userUpdated;
      } catch (err) {
         throw err;
      }
   }

   async delete(idUser: string) {
      try {
         const userDelete = await User.findByIdAndRemove(idUser);
         await Profile.findOneAndRemove({user:idUser});
         if (userDelete) {
            return { msg: "User deleted" };
         }
         throw new Error("User not found");
      } catch (err) {
         throw err;
      }
   }

   async validateUser(email: string): Promise<IUser | null> {
      return await User.findOne({ email: email }).populate("profile").populate("touristicDestinations").exec();
   }

   async getUserProvider(userId: string): Promise<IUser | null> {
      return await User.findOne({ _id: userId, isProvider: true }).populate("profile").populate("touristicDestinations").exec();
   }

   createToken(user: IUser) {
      return jwt.sign(
         { id: user._id, email: user.email, isProvider: user.isProvider },
         config.jwtScret,
         { expiresIn: 3600 }
      );
   }
}
