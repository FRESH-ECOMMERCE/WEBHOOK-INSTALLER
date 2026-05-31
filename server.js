"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./src/app"));
const appConfig_1 = require("./src/configs/appConfig");
const logger_1 = __importDefault(require("./src/utilities/logger"));
const PORT = appConfig_1.appConfigs.app.port || 8000;
const server = app_1.default.listen(PORT, () => {
    logger_1.default.info(`Server running on http://localhost:${PORT}`);
});
process.on('SIGTERM', () => {
    logger_1.default.info('SIGTERM received. Shutting down gracefully.');
    server.close(() => {
        logger_1.default.info('HTTP server closed.');
    });
});
process.on('uncaughtException', (err) => {
    logger_1.default.error('Uncaught Exception:', err);
    process.exit(1);
});
process.on('unhandledRejection', (reason) => {
    logger_1.default.error('Unhandled Rejection:', reason);
});
