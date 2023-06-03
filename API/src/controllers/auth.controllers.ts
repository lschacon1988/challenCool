import { Request, Response } from "express";
import UsersManager from "../utils/manager/Users.manger";
import { IUser } from "../models/User";

const usersManager: any = new UsersManager();

export const signUp = async (req: Request, res: Response): Promise<Response> => {
   try {
      const user = await usersManager.create(req.body);
      return res.status(201).json(user);
   } catch (error) {  
      const errorMessage = (error as Error).message      
      return res.status(400).json({error: errorMessage});
   }
};

export const signIn = async (req: Request, res: Response) => {
   try {
      const user = await usersManager.validateUser(req.body.email, req.body.username);
      if (!user) {
         return res.status(400).json({ msg: "The user does not exist" });
      }
      const isMatch = await user.comparePassword(req.body.password);
      if (isMatch) {
         return res.status(200).json({ token: usersManager.createToken(user) });
      }
      console.log("The email or password are incorrect");
      return res.status(400).json({ msg: "The email or password are incorrect" });
   } catch (error) {
      return res.status(400).json({error: error});
   }
};
