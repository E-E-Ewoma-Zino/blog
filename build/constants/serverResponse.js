"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVER_RES = exports.SERVER_RES_ARRAY = void 0;
// data refers to: Array<Type>
const SERVER_RES_ARRAY = ({ message, err, status, alert, data }) => ({ message, err, status, alert, data });
exports.SERVER_RES_ARRAY = SERVER_RES_ARRAY;
// data refers to: Type
const SERVER_RES = ({ message, err, status, alert, data }) => ({ message, err, status, alert, data });
exports.SERVER_RES = SERVER_RES;
