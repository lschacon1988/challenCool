import { Request, Response } from "express";
import UsersManagerDB from "../utils/manager/Users.manger";

const usersManagerDB: any = new UsersManagerDB();


export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await usersManagerDB.getAll();
        res.status(200).json(users);
    } catch (error) {
        return res.status(400).json({ msg: error });
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await usersManagerDB.getById(req.params.idUser);
        res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ msg: error });
    }
}