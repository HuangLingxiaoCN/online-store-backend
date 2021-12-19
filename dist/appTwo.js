"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const apiErrorHandler_1 = __importDefault(require("./middlewares/apiErrorHandler"));
const apiContentType_1 = __importDefault(require("./middlewares/apiContentType"));
const lusca_1 = __importDefault(require("lusca"));
const compression_1 = __importDefault(require("compression"));
const product_1 = __importDefault(require("./routers/product"));
dotenv_1.default.config({ path: '.env' });
const appTwo = express_1.default();
appTwo.set('port', process.env.PORT || 3000);
appTwo.use(express_1.default.json());
// Use common 3rd-party middlewares
appTwo.use(apiContentType_1.default);
appTwo.use(compression_1.default());
appTwo.use(express_1.default.json());
appTwo.use(lusca_1.default.xframe('SAMEORIGIN'));
appTwo.use(lusca_1.default.xssProtection(true));
appTwo.use('/product/products', product_1.default);
// Custom API error handler
appTwo.use(apiErrorHandler_1.default);
exports.default = appTwo;
//# sourceMappingURL=appTwo.js.map