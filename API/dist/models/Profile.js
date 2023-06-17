"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const profileSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    profileImage: { type: String, required: true },
    coutry: { type: String, required: true },
    city: { type: String, required: true },
    tlf: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
});
exports.default = (0, mongoose_1.model)("Profile", profileSchema);
