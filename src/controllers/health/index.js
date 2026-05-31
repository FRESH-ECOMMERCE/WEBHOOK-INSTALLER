"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheckController = exports.mainController = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const requestHandler_1 = require("../../utilities/requestHandler");
const mainController = async (req, res) => {
    try {
        return res.status(http_status_codes_1.StatusCodes.OK).json(response_1.ResponseData.success({
            data: { aboutMe: 'Welcome to FRESH E-COMMERCE API sV1' },
            message: 'Welcome to FRESH E-COMMERCE API sV1'
        }));
    }
    catch (serverError) {
        return (0, requestHandler_1.handleError)(res, serverError);
    }
};
exports.mainController = mainController;
const healthCheckController = async (req, res) => {
    try {
        return res.status(http_status_codes_1.StatusCodes.OK).json(response_1.ResponseData.success({
            data: { status: 'ok', uptime: process.uptime() },
            message: 'Health check successful'
        }));
    }
    catch (serverError) {
        return (0, requestHandler_1.handleError)(res, serverError);
    }
};
exports.healthCheckController = healthCheckController;
