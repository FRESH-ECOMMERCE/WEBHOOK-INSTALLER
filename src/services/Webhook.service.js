"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookService = void 0;
const axios_1 = __importDefault(require("axios"));
const http_status_codes_1 = require("http-status-codes");
const appConfig_1 = require("../configs/appConfig");
const appError_1 = require("../utilities/appError");
const logger_1 = __importDefault(require("../utilities/logger"));
const freshEcommerceBaseUrl =
  appConfig_1.appConfigs.freshEcommerce.baseURL?.replace(/\/$/, "") ?? "";
const FRESH_ECOMMERCE_MIDTRANS_WEBHOOK_URL = `${freshEcommerceBaseUrl}/webhooks/midtrans`;
const FRESH_ECOMMERCE_BITSHIP_WEBHOOK_URL = `${freshEcommerceBaseUrl}/webhooks/bitships`;
const isSuccessfulHttpStatus = (status) =>
  status >= http_status_codes_1.StatusCodes.OK &&
  status < http_status_codes_1.StatusCodes.MULTIPLE_CHOICES;
class WebhookService {
  static async forwardToFreshEcommerce(url, payload, provider) {
    if (!freshEcommerceBaseUrl) {
      throw new appError_1.AppError(
        "Fresh E-Commerce base URL is not configured",
        http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
    await axios_1.default.post(url, payload, {
      headers: { "Content-Type": "application/json" },
      validateStatus: (status) => isSuccessfulHttpStatus(status),
    });
    return { message: "success" };
  }
  static async handleMidtransWebhook(payload) {
    try {
      return await this.forwardToFreshEcommerce(
        FRESH_ECOMMERCE_MIDTRANS_WEBHOOK_URL,
        payload,
        "midtrans",
      );
    } catch (serviceError) {
      if (serviceError instanceof appError_1.AppError) throw serviceError;
      if (axios_1.default.isAxiosError(serviceError)) {
        logger_1.default.error(
          `[WebhookService] midtrans failed: ${JSON.stringify({
            message: serviceError.message,
            status: serviceError.response?.status,
            data: serviceError.response?.data,
          })}`,
        );
      } else {
        logger_1.default.error(
          `[WebhookService] midtrans failed: ${String(serviceError)}`,
        );
      }
      throw new appError_1.AppError(
        "Failed to process midtrans webhook",
        http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
  static async handleBitshipWebhook(payload) {
    try {
      // await this.forwardToFreshEcommerce(FRESH_ECOMMERCE_BITSHIP_WEBHOOK_URL, payload, 'bitship');
      return {
        message: "success",
        status: http_status_codes_1.StatusCodes.OK.toString(),
      };
    } catch (serviceError) {
      if (serviceError instanceof appError_1.AppError) throw serviceError;
      if (axios_1.default.isAxiosError(serviceError)) {
        logger_1.default.error(
          `[WebhookService] bitship failed: ${JSON.stringify({
            message: serviceError.message,
            status: serviceError.response?.status,
            data: serviceError.response?.data,
          })}`,
        );
      } else {
        logger_1.default.error(
          `[WebhookService] bitship failed: ${String(serviceError)}`,
        );
      }
      throw new appError_1.AppError(
        "Failed to process bitship webhook",
        http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
exports.WebhookService = WebhookService;
