"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDestino = exports.updateDestino = exports.createDestino = exports.getDestinoById = exports.getAllDestinos = void 0;
const Destinos_managerDB_1 = __importDefault(require("../utils/manager/Destinos.managerDB"));
const Users_manger_1 = __importDefault(require("../utils/manager/Users.manger"));
const messageError_1 = require("../utils/error/messageError");
const destinosManagerDB = new Destinos_managerDB_1.default();
const usersManager = new Users_manger_1.default();
const getAllDestinos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const destinos = yield destinosManagerDB.getAllDestino();
        res.status(200).json(destinos);
    }
    catch (error) {
        return res.status(400).json({ msg: (0, messageError_1.messageError)(error) });
    }
});
exports.getAllDestinos = getAllDestinos;
const getDestinoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const destino = yield destinosManagerDB.getById(req.params.idDestino);
        res.status(200).json(destino);
    }
    catch (error) {
        return res.status(400).json({ msg: (0, messageError_1.messageError)(error) });
    }
});
exports.getDestinoById = getDestinoById;
const createDestino = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield usersManager.getUserProvider(req.params.idUser);
        if (!user)
            return res.status(401).json({ msg: 'El usuario no esta autorizado debes compeltar el proceso de registro' });
        const destino = yield destinosManagerDB.create(req.params.idUser, req.body);
        res.status(201).json(destino);
    }
    catch (error) {
        return res.status(400).json({ msg: (0, messageError_1.messageError)(error) });
    }
});
exports.createDestino = createDestino;
const updateDestino = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const destino = yield destinosManagerDB.update(req.params.idDestino, req.body);
        res.status(200).json(destino);
    }
    catch (error) {
        return res.status(400).json({ msg: (0, messageError_1.messageError)(error) });
    }
});
exports.updateDestino = updateDestino;
const deleteDestino = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const destino = yield destinosManagerDB.delete(req.params.idUser, req.params.idDestino);
        res.status(200).json(destino);
    }
    catch (error) {
        return res.status(400).json({ msg: (0, messageError_1.messageError)(error) });
    }
});
exports.deleteDestino = deleteDestino;
