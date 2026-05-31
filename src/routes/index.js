"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const registry_1 = __importDefault(require("./registry"));
const swagger_1 = require("../configs/swagger");
const response_1 = require("../utilities/response");
const logger_1 = __importDefault(require("../utilities/logger"));
const routers = (0, express_1.Router)();
routers.use('/api/v1/', registry_1.default.HealthRoute);
routers.use('/api/v1/webhooks', registry_1.default.WebhookRouter);
routers.use('/api/v1/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec, {
    customJs: '/api/v1/docs-static/swagger-qr-preview.js'
}));
routers.use((req, res) => {
    const message = `Route ${req.originalUrl} not found!`;
    logger_1.default.warn(message);
    const response = response_1.ResponseData.error({ message });
    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response);
});
exports.default = routers;
