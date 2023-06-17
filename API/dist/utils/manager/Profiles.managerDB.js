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
const Profile_1 = __importDefault(require("../../models/Profile"));
const User_1 = __importDefault(require("../../models/User"));
class ProfilesManager {
    constructor() {
        this.getAllProfiles = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const profiles = yield Profile_1.default.find().populate("user", [
                    "username",
                    "isProvider",
                ]);
                return profiles;
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
        this.getProfileById = (idUser) => __awaiter(this, void 0, void 0, function* () {
            try {
                const profile = yield Profile_1.default.findOne({ user: idUser })
                    .populate("user", { username: 1, isProvider: 1 })
                    .exec();
                if (!profile)
                    throw new Error("Profile not found");
                return profile;
            }
            catch (error) {
                throw error;
            }
        });
        this.createProfile = (idUser, profile) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findById(idUser).populate("profile").exec();
                if (!user) {
                    throw new Error("User not found");
                }
                if (user.profile !== null)
                    throw new Error("User already has a profile");
                const newProfile = new Profile_1.default(profile);
                newProfile.user = user._id;
                yield newProfile.save();
                user.profile = newProfile._id;
                user.isProvider = true;
                yield user.save();
                return yield User_1.default.findById(idUser).populate("profile").exec();
            }
            catch (error) {
                throw error;
            }
        });
        this.updateProfile = (idUser, profile) => __awaiter(this, void 0, void 0, function* () {
            try {
                const profileDB = yield Profile_1.default.findOneAndUpdate({ user: idUser }, profile, { new: true });
                if (!profileDB)
                    throw new Error("Profile not found");
                return profileDB;
            }
            catch (error) {
                throw error;
            }
        });
        this.deleteProfile = (idProfile) => __awaiter(this, void 0, void 0, function* () {
            try {
                const profile = yield Profile_1.default.findOneAndRemove({ _id: idProfile });
                if (!profile)
                    throw new Error("Profile not found");
                return { msg: "Profile deleted" };
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
}
exports.default = ProfilesManager;
