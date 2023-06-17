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
const Destino_1 = __importDefault(require("../../models/Destino"));
const User_1 = __importDefault(require("../../models/User"));
class DestinosManagerDB {
    constructor() {
        this.getAllDestino = () => __awaiter(this, void 0, void 0, function* () {
            return yield Destino_1.default.find();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const destino = yield Destino_1.default.findById(id);
                if (!destino) {
                    throw new Error(`Destino not found`);
                }
                return destino;
            }
            catch (error) {
                throw error;
            }
        });
    }
    create(userId, destino) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userProvider = yield User_1.default.findById(userId);
                if (!userProvider) {
                    throw new Error("User not found");
                }
                if (!(userProvider === null || userProvider === void 0 ? void 0 : userProvider.isProvider)) {
                    throw new Error("User is not a provider completely you profile");
                }
                const newDestino = new Destino_1.default(destino);
                newDestino.user = userProvider._id;
                yield newDestino.save();
                userProvider.touristicDestinations.push(newDestino._id);
                yield userProvider.save();
                return newDestino;
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(userId, destino) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userProvider = yield User_1.default.findById(userId);
                if (!userProvider) {
                    throw new Error("User not found");
                }
                if (!userProvider.isProvider) {
                    throw new Error("User is not a provider completely you profile");
                }
                const destinoUpdated = yield Destino_1.default.findByIdAndUpdate(destino._id, destino, { new: true });
                if (!destinoUpdated) {
                    throw new Error("Dest not found");
                }
                return destinoUpdated;
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(userId, idDestino) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userProvider = yield User_1.default.findById(userId);
                if (!userProvider) {
                    throw new Error("User not found");
                }
                if (!userProvider.isProvider) {
                    throw new Error("User is not a provider completely you profile");
                }
                const idDestinoUser = idDestino;
                const index = userProvider.touristicDestinations.indexOf(idDestinoUser);
                userProvider.touristicDestinations.splice(index, 1);
                userProvider.save();
                const destinoDeleted = yield Destino_1.default.findByIdAndDelete(idDestino);
                if (!destinoDeleted) {
                    throw new Error("Dest not found");
                }
                return destinoDeleted;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = DestinosManagerDB;
