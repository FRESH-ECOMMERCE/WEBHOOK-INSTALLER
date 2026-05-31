"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBiteShipErrorDetail = exports.BiteShipAPIService = void 0;
const axios_1 = __importDefault(require("axios"));
const appConfig_1 = require("../../configs/appConfig");
const logger_1 = __importDefault(require("../../utilities/logger"));
exports.BiteShipAPIService = axios_1.default.create({
    baseURL: appConfig_1.appConfigs.biteShip.baseURL,
    headers: {
        Authorization: `Bearer ${appConfig_1.appConfigs.biteShip.apiKey}`,
        'Content-Type': 'application/json'
    }
});
const getBiteShipErrorDetail = (error) => {
    if (axios_1.default.isAxiosError(error)) {
        return JSON.stringify({
            message: error.message,
            status: error.response?.status,
            statusText: error.response?.statusText,
            method: error.config?.method,
            url: error.config?.url,
            responseData: error.response?.data
        });
    }
    return String(error);
};
exports.getBiteShipErrorDetail = getBiteShipErrorDetail;
exports.BiteShipAPIService.interceptors.response.use((response) => response, async (error) => {
    logger_1.default.error(`[BiteShipAPIService] request failed: ${(0, exports.getBiteShipErrorDetail)(error)}`);
    throw error;
});
