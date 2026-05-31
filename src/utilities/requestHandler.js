"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.handleServerError = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("./response");
const logger_1 = __importDefault(require("./logger"));
const appError_1 = require("./appError");
function handleServerError(res, err) {
    if (err instanceof Error) {
        const message = `Unable to process request!: ${err.message}`;
        logger_1.default.error(message, { stack: err.stack });
        const response = response_1.ResponseData.error({
            message: 'Unable to process request! Error code 1T33'
        });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
    const message = 'Unable to process request! Unknown error';
    logger_1.default.error(message);
    const response = response_1.ResponseData.error({ message: 'Unable to process request!' });
    return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
}
exports.handleServerError = handleServerError;
function handleError(res, err) {
    if (err instanceof appError_1.AppError) {
        logger_1.default.warn(`[AppError] ${err.statusCode}: ${err.message}`);
        return res.status(err.statusCode).json(response_1.ResponseData.error({ message: err.message }));
    }
    return handleServerError(res, err);
}
exports.handleError = handleError;
