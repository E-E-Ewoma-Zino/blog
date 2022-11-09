"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module for the users
const mongoose_1 = require("mongoose");
const siteManagerSchema = new mongoose_1.Schema({
    siteName: String,
    siteUrl: String,
    contactInfo: {
        phoneNo: String,
        mail: String,
        whatsApp: String
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("SiteManager", siteManagerSchema);
