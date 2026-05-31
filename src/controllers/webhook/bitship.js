"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bitshipWebhookHandler = void 0;
const response_1 = require("../../utilities/response");
const http_status_codes_1 = require("http-status-codes");
const requestHandler_1 = require("../../utilities/requestHandler");
const Webhook_service_1 = require("../../services/Webhook.service");
const bitshipWebhookHandler = async (req, res) => {
    try {
        const payload = req.body;
        const result = await Webhook_service_1.WebhookService.handleBitshipWebhook(payload);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response_1.ResponseData.success({ data: result }));
    }
    catch (serverError) {
        return (0, requestHandler_1.handleError)(res, serverError);
    }
};
exports.bitshipWebhookHandler = bitshipWebhookHandler;
