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
const User_1 = __importDefault(require("../../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const Profile_1 = __importDefault(require("../../models/Profile"));
const passwordHash_1 = require("../passwordHash");
const Destino_1 = __importDefault(require("../../models/Destino"));
class UsersManager {
    constructor() {
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            return yield User_1.default.find()
                .populate("touristicDestinations")
                .populate("profile")
                .exec();
        });
    }
    getById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findById(userId)
                    .populate("touristicDestinations")
                    .populate("profile")
                    .exec();
                if (!user) {
                    throw new Error(`User not found`);
                }
                return user;
            }
            catch (err) {
                throw err;
            }
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validateUser = yield User_1.default.findOne({
                    email: user.email,
                }).exec();
                if (!validateUser) {
                    return yield User_1.default.create(user);
                }
                throw new Error("User already exists");
            }
            catch (err) {
                throw err;
            }
        });
    }
    update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userPassword = user;
                userPassword.password = yield (0, passwordHash_1.passwordHash)(userPassword.password);
                const userUpdated = yield User_1.default.findByIdAndUpdate(id, userPassword, {
                    new: true,
                }).populate("profile").exec();
                if (!userUpdated) {
                    throw new Error("User not found");
                }
                return userUpdated;
            }
            catch (err) {
                throw err;
            }
        });
    }
    delete(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userDelete = yield User_1.default.findByIdAndRemove(idUser);
                yield Profile_1.default.findOneAndRemove({ user: idUser });
                yield Destino_1.default.deleteMany({ user: idUser });
                if (!userDelete) {
                    throw new Error("User not found");
                }
                return { msg: "User deleted" };
            }
            catch (err) {
                throw err;
            }
        });
    }
    validateUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.default.findOne({ email: email }).populate("profile").populate("touristicDestinations").exec();
        });
    }
    getUserProvider(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.default.findOne({ _id: userId, isProvider: true }).populate("profile").populate("touristicDestinations").exec();
        });
    }
    createToken(user) {
        return jsonwebtoken_1.default.sign({ id: user._id, email: user.email, isProvider: user.isProvider }, config_1.default.jwtScret, { expiresIn: 3600 });
    }
}
exports.default = UsersManager;
