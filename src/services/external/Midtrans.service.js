"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MidtransAPIService = void 0;
const midtrans_client_1 = __importDefault(require("midtrans-client"));
const appConfig_1 = require("../../configs/appConfig");
const appError_1 = require("../../utilities/appError");
const http_status_codes_1 = require("http-status-codes");
const logger_1 = __importDefault(require("../../utilities/logger"));
class MidtransAPIService {
    static MidtransSnap() {
        return new midtrans_client_1.default.Snap({
            isProduction: appConfig_1.appConfigs.midtrans.isProduction,
            serverKey: appConfig_1.appConfigs.midtrans.serverKey,
            clientKey: appConfig_1.appConfigs.midtrans.clientKey
        });
    }
    static async createTransaction(payload) {
        try {
            return await this.MidtransSnap().createTransaction(payload);
        }
        catch (error) {
            if (error instanceof appError_1.AppError)
                throw error;
            logger_1.default.error(`[MidtransAPIService] createTransaction failed: ${String(error)}`);
            throw new appError_1.AppError('Failed to create transaction', http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.MidtransAPIService = MidtransAPIService;
