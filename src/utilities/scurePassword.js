"use strict";
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = void 0;
const appConfig_1 = require("../configs/appConfig");
function hashPassword(password) {
    return require('crypto')
        .createHash('sha1')
        .update(password + appConfig_1.appConfigs.secret.passwordEncryption)
        .digest('hex');
}
exports.hashPassword = hashPassword;
