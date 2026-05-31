"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleProductExcelUpload = exports.productExcelUploadMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const response_1 = require("../utilities/response");
const uploadDir = path_1.default.resolve(process.cwd(), 'uploads');
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});
const excelFileFilter = (_req, file, cb) => {
    const allowedTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel'
    ];
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Only Excel files (.xls, .xlsx) are allowed!'));
    }
    cb(null, true);
};
exports.productExcelUploadMiddleware = (0, multer_1.default)({
    storage,
    fileFilter: excelFileFilter
}).single('file');
/** Menjalankan multer dan mengembalikan 400 jika file tidak valid (bukan next(err)). */
const handleProductExcelUpload = (req, res, next) => {
    (0, exports.productExcelUploadMiddleware)(req, res, (err) => {
        if (err != null) {
            const message = err instanceof Error ? err.message : 'Invalid file upload';
            res.status(400).json(response_1.ResponseData.error({ message }));
            return;
        }
        next();
    });
};
exports.handleProductExcelUpload = handleProductExcelUpload;
