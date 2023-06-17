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
exports.signIn = exports.signUp = void 0;
const Users_manger_1 = __importDefault(require("../utils/manager/Users.manger"));
const messageError_1 = require("../utils/error/messageError");
const usersManager = new Users_manger_1.default();
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield usersManager.create(req.body);
        return res.status(201).json(user);
    }
    catch (error) {
        return res.status(400).json({ error: (0, messageError_1.messageError)(error) });
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield usersManager.validateUser(req.body.email);
        if (!user) {
            return res.status(400).json({ msg: "The user does not exist" });
        }
        const isMatch = yield user.comparePassword(req.body.password);
        if (isMatch) {
            return res.status(200).json({ token: usersManager.createToken(user) });
        }
        return res.status(400).json({ msg: "The email or password are incorrect" });
    }
    catch (error) {
        return res.status(400).json({ error: (0, messageError_1.messageError)(error) });
    }
});
exports.signIn = signIn;
