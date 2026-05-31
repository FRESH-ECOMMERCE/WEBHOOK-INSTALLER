"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../utilities/response");
const jwt_1 = require("../utilities/jwt");
const requestHandler_1 = require("../utilities/requestHandler");
const authorization = (req, res, next) => {
    try {
        if (req.headers.authorization == null ||
            !req.headers.authorization.startsWith('Bearer ')) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json(response_1.ResponseData.error({ message: 'Missing Authorization.' }));
        }
        const token = req.headers.authorization.split(' ')[1];
        const verify = (0, jwt_1.verifyAccessToken)(token);
        if (!verify) {
            return res
                .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                .json(response_1.ResponseData.error({ message: 'Invalid Authorization.' }));
        }
        req.jwtPayload = verify;
        next();
    }
    catch (serverError) {
        return (0, requestHandler_1.handleError)(res, serverError);
    }
};
exports.authorization = authorization;
