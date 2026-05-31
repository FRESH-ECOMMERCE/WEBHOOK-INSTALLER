"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOrigin = void 0;
const cors_1 = __importDefault(require("cors"));
const appConfig_1 = require("../configs/appConfig");
const corsOrigin = () => (0, cors_1.default)({
    origin: appConfig_1.appConfigs.cors.origin?.toString().split(',') ?? ['http://localhost:5173'],
    credentials: true
});
exports.corsOrigin = corsOrigin;
