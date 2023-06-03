import { Response, Request } from "express";
import DestinosManagerDB from "../utils/manager/Destinos.managerDB";

const destinosManagerDB: any = new DestinosManagerDB();

export const getAllDestinos = async (req: Request, res: Response) => {
    try {
        const destinos = await destinosManagerDB.getAllDestino();
        res.status(200).json(destinos);
    } catch (error) {
        return res.status(400).json({ msg: error });
    }
}

export const getDestinoById = async (req: Request, res: Response) => {
    try {
        const destino = await destinosManagerDB.getById(req.params.idDestino);
        res.status(200).json(destino);
    } catch (error) {
        return res.status(400).json({ msg: error });
    }
}

export const createDestino = async (req: Request, res: Response) => {
    try {
        const destino = await destinosManagerDB.create(req.params.idUser, req.body);
        res.status(201).json(destino);
    } catch (error) {
        return res.status(400).json({ msg: error });
    }
}

export const updateDestino = async (req: Request, res: Response) => {
    try {
        const destino = await destinosManagerDB.update(req.params.idDestino, req.body);
        res.status(200).json(destino);
    } catch (error) {
        return res.status(400).json({ msg: error });
    }
}

export const deleteDestino = async (req: Request, res: Response) => {
    try {
        const destino = await destinosManagerDB.delete(req.params.idDestino);
        res.status(200).json(destino);
    } catch (error) {
        return res.status(400).json({ msg: error });
    }
}
