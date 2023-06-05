import { Request, Response } from "express";
import UsersManagerDB from "../utils/manager/Users.manger";
import { messageError } from "../utils/error/messageError";

const usersManagerDB: any = new UsersManagerDB();


export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await usersManagerDB.getAll();
        res.status(200).json(users);
    } catch (error) {
        return res.status(400).json({ msg: messageError(error) });
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await usersManagerDB.getById(req.params.idUser);
        res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ msg: messageError(error) });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await usersManagerDB.update(req.params.idUser, req.body);
        res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ msg: messageError(error) });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await usersManagerDB.delete(req.params.idUser);
        res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ msg: messageError(error) });
    }
}