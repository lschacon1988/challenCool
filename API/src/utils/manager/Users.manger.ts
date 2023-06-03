import User, { IUser } from "../../models/User";
import  jwt  from "jsonwebtoken";
import config from "../config/config";
import "mongoose";



export default class UsersManager {
   
    getAll = async (): Promise<IUser[]> => {
      return await User.find().populate("touristicDestinations").populate("profile").exec();
   }

   async getById(idUser: string): Promise<IUser | Object> {
      const user = await User.findById(idUser).populate("touristicDestinations").populate("profile").exec();
      if (!user) {
         return { msg: "User not found" };
      }
      return user;
   }

   async create(user: IUser): Promise<IUser | object> {
      const validateUser: IUser | null = await User.findOne({email:user.email} ).exec();
      
      if(!validateUser){
         return (await User.create(user)).populate("touristicDestinations");
      }

      return {msg:"The user already exist"};
      
   }

   async update(id: string, user: IUser): Promise<IUser | object> {
      const userUpdated = await User.findByIdAndUpdate(id, user, { new: true });
      if (!userUpdated) {
         return { msg: "User not found" };
      }
      return userUpdated;
   }

   async delete(id: string) {
      const userDelete = await User.findByIdAndRemove(id);
      if (userDelete) {
         return "User deleted";
      }
      return "User not found";
   }

   async validateUser(email: string): Promise<IUser | null> {
      return await User.findOne({email:email} )
   }

   createToken(user: IUser) {
      return jwt.sign({id: user._id, email: user.email, isProvider: user.isProvider }, config.jwtScret,{expiresIn: 3600})
   
   }




};
