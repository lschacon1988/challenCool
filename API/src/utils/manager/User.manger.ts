import User, { IUser } from "../../models/User.js";

export default class UserManager {
   
    getAll = async (): Promise<IUser[]> => {
      return await User.find();
   }

   async getById(id: string): Promise<IUser | Object> {
      const user = await User.findById(id);
      if (!user) {
         return { msg: "User not found" };
      }
      return user;
   }

   async create(user: IUser): Promise<IUser> {
      return await User.create(user);
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
};
