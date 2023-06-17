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
exports.deleteProfile = exports.updateProfile = exports.createProfile = exports.getProfileById = exports.getAllProfiles = void 0;
const Profiles_managerDB_1 = __importDefault(require("../utils/manager/Profiles.managerDB"));
const messageError_1 = require("../utils/error/messageError");
const profilesManagerDB = new Profiles_managerDB_1.default();
const getAllProfiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profiles = yield profilesManagerDB.getAllProfiles();
        res.status(200).json(profiles);
    }
    catch (error) {
        return res.status(400).json({ msg: (0, messageError_1.messageError)(error) });
    }
});
exports.getAllProfiles = getAllProfiles;
const getProfileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield profilesManagerDB.getProfileById(req.params.idUser);
        res.status(200).json(profile);
    }
    catch (error) {
        return res.status(400).json({ msg: (0, messageError_1.messageError)(error) });
    }
});
exports.getProfileById = getProfileById;
const createProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield profilesManagerDB.createProfile(req.params.idUser, req.body);
        res.status(201).json(profile);
    }
    catch (error) {
        return res.status(400).json({ msg: (0, messageError_1.messageError)(error) });
    }
});
exports.createProfile = createProfile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield profilesManagerDB.updateProfile(req.params.idProfile, req.body);
        res.status(200).json(profile);
    }
    catch (error) {
        return res.status(400).json({ msg: (0, messageError_1.messageError)(error) });
    }
});
exports.updateProfile = updateProfile;
const deleteProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield profilesManagerDB.deleteProfile(req.params.idPofile);
        res.status(200).json(profile);
    }
    catch (error) {
        return res.status(400).json({ msg: (0, messageError_1.messageError)(error) });
    }
});
exports.deleteProfile = deleteProfile;
