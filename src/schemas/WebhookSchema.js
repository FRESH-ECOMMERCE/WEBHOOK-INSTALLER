"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bitshipWebhookBodySchema = exports.midtransWebhookBodySchema = void 0;
const zod_1 = require("zod");
exports.midtransWebhookBodySchema = zod_1.z.object({
    order_id: zod_1.z.string().min(1),
    transaction_status: zod_1.z.string().min(1),
    status_code: zod_1.z.union([zod_1.z.string(), zod_1.z.number()]).transform((v) => String(v)),
    gross_amount: zod_1.z.union([zod_1.z.string(), zod_1.z.number()]).transform((v) => String(v)),
    payment_type: zod_1.z.string().optional(),
    signature_key: zod_1.z.string().min(1)
});
exports.bitshipWebhookBodySchema = zod_1.z.object({
    event: zod_1.z.string().optional(),
    order_id: zod_1.z.string().optional(),
    order_price: zod_1.z.number().optional(),
    courier_tracking_id: zod_1.z.string().optional(),
    courier_waybill_id: zod_1.z.string().min(1),
    courier_company: zod_1.z.string().optional(),
    courier_type: zod_1.z.string().optional(),
    status: zod_1.z.string().optional()
});
