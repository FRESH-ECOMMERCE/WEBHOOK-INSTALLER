"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Healt_route_1 = __importDefault(require("./Healt.route"));
const Webhook_route_1 = __importDefault(require("./Webhook.route"));
const RoutesRegistry = {
    HealthRoute: Healt_route_1.default,
    WebhookRouter: Webhook_route_1.default
};
exports.default = RoutesRegistry;
