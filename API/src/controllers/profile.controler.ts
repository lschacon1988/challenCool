import { Request, Response } from "express";
import ProfilesManager from "../utils/manager/Profiles.managerDB";


const profilesManagerDB: any = new ProfilesManager();

export const getAllProfiles = async (req: Request, res: Response) => {
    try {
        const profiles = await profilesManagerDB.getAllProfiles();
        res.status(200).json(profiles);
    } catch (error) {
        return res.status(400).json({ msg: error });
    }
}

export const getProfileById = async (req: Request, res: Response) => {
    try {
        const profile = await profilesManagerDB.getProfileById(req.params.idUser);
        res.status(200).json(profile);
    } catch (error) {
        return res.status(400).json({ msg: error });
    }
}

export const createProfile = async (req: Request, res: Response) => {
    try {
        const profile = await profilesManagerDB.createProfile(req.params.idUser, req.body);
        res.status(201).json(profile);
    } catch (error) {
        return res.status(400).json({ msg: error });
    }
}