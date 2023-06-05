import { Request, Response } from "express";
import UsersManager, { IUserManager } from "../utils/manager/Users.manger";
import { IUser } from "../models/User";
import { messageError } from "../utils/error/messageError";

const usersManager: IUserManager = new UsersManager();

export const signUp = async (req: Request, res: Response): Promise<Response> => {
   try {
      const user = await usersManager.create(req.body);
      return res.status(201).json(user);
   } catch (error) { 
            
      return res.status(400).json({error: messageError(error)});
   }
};


export const signIn = async (req: Request, res: Response) => {
   try {
      const user = await usersManager.validateUser(req.body.email);
      if (!user) {
         return res.status(400).json({ msg: "The user does not exist" });
      }
      const isMatch = await user.comparePassword(req.body.password);
      if (isMatch) {
         return res.status(200).json({ token: usersManager.createToken(user) });
      }
      
      return res.status(400).json({ msg: "The email or password are incorrect" });
   } catch (error) {
      return res.status(400).json({error: messageError(error)});
   }
};
