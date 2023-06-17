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
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = void 0;
const Users_manger_1 = __importDefault(require("../utils/manager/Users.manger"));
const messageError_1 = require("../utils/error/messageError");
const usersManagerDB = new Users_manger_1.default();
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield usersManagerDB.getAll();
        res.status(200).json(users);
    }
    catch (error) {
        return res.status(400).json({ msg: (0, messageError_1.messageError)(error) });
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield usersManagerDB.getById(req.params.idUser);
        res.status(200).json(user);
    }
    catch (error) {
        return res.status(400).json({ msg: (0, messageError_1.messageError)(error) });
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield usersManagerDB.update(req.params.idUser, req.body);
        res.status(200).json(user);
    }
    catch (error) {
        return res.status(400).json({ msg: (0, messageError_1.messageError)(error) });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield usersManagerDB.delete(req.params.idUser);
        res.status(204).json(user);
    }
    catch (error) {
        return res.status(400).json({ msg: (0, messageError_1.messageError)(error) });
    }
});
exports.deleteUser = deleteUser;
