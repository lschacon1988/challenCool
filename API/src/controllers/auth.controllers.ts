
import {Request, Response} from 'express'
import UserManager from '../utils/manager/User.manger';

const userManager: any = new UserManager();

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userManager.getAll();
        res.status(200).json(users);
    } catch (error) {
        return res.status(400).json({ msg: error });
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await userManager.getById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ msg: error });
    }
}

export const createUser = async (req: Request, res: Response) => {
    
    try {
        const user = await userManager.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ msg: error });
    }
}


