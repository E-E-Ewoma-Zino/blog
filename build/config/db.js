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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
//  Configure mongodb for online and local DB
function default_1() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const devUrl = process.env.MONGO_DEVELOPMENT_URL;
            const proUrl = process.env.MONGO_PRODUCTION_URL;
            const connected = yield (0, mongoose_1.connect)(process.env.NODE_ENV === "production" ? proUrl : devUrl);
            // 
            console.log(`Connected Successfully at ${connected.connection.host}`);
        }
        catch (err) {
            console.error(":::::::::::::>" + err);
            process.exit(1);
        }
    });
}
exports.default = default_1;
