"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = void 0;
/**
 * Pagination utility. Page is 1-based: page 1 = first page.
 */
class Pagination {
    constructor(page, size = 10) {
        this.page = Math.max(1, Math.floor(Number(page)) || 1);
        this.limit = Math.max(1, Math.floor(Number(size)) || 10);
        this.offset = this.calculateOffset(this.page, this.limit);
    }
    /** Offset for 1-based page: page 1 -> 0, page 2 -> limit, etc. */
    calculateOffset(page, size) {
        return (page - 1) * size;
    }
    formatData(data) {
        const { count, rows } = data;
        const totalPages = Math.ceil(count / this.limit) || 0;
        return {
            totalItems: count,
            items: rows,
            totalPages,
            currentPage: this.page
        };
    }
}
exports.Pagination = Pagination;
