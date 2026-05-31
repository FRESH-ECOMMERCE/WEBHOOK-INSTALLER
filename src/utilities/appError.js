"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
const http_status_codes_1 = require("http-status-codes");
class AppError extends Error {
    constructor(message, statusCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Object.setPrototypeOf(this, AppError.prototype);
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        }
    }
    static notFound(message) {
        return new AppError(message, http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    static badRequest(message) {
        return new AppError(message, http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    static conflict(message) {
        return new AppError(message, http_status_codes_1.StatusCodes.CONFLICT);
    }
}
exports.AppError = AppError;
