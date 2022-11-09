"use strict";
// All http status and meaning
Object.defineProperty(exports, "__esModule", { value: true });
const STATUS = {
    OK_200: 200,
    CREATED_201: 201,
    ACCPTED_202: 202,
    NO_CONTENT_204: 204,
    RESET_CONTENT_205: 205,
    NOT_MODIFIED_304: 304,
    BAD_REQUEST_400: 400,
    UNAUTHORIZED_401: 401,
    FORBIDDEN_403: 403,
    NOT_FOUND_404: 404,
    NOT_ALLOWED_405: 405,
    REQUEST_TIMEOUT_408: 408,
    CONFLICT_409: 409,
    UNAVALIABLE_410: 410,
    UNSUPPORTED_MEIDA_TYPE_415: 415,
    TOO_MANY_REQ_429: 429,
    SERVER_ERR_500: 500,
    SERVICE_UNAVALIABLE_503: 503
};
exports.default = STATUS;
