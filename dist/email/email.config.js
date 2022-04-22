"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CLIENT_ORIGIN = process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_ORIGIN
    : 'http://localhost:3000';
exports.default = CLIENT_ORIGIN;
//# sourceMappingURL=email.config.js.map