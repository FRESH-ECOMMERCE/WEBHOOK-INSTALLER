"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSellPrice = void 0;
/**
 * Harga jual setelah diskon persen (dibulatkan ke integer terdekat).
 */
function calculateSellPrice({ originalPrice, discountPercent }) {
    const price = Number(originalPrice);
    const disc = Number(discountPercent);
    if (Number.isNaN(price) || Number.isNaN(disc))
        return 0;
    const clamped = Math.min(100, Math.max(0, disc));
    return Math.round(price * (1 - clamped / 100));
}
exports.calculateSellPrice = calculateSellPrice;
