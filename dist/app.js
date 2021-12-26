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
const cors_1 = __importDefault(require("cors"));
const product_1 = __importDefault(require("./routers/product"));
const user_1 = __importDefault(require("./routers/user"));
const auth_1 = __importDefault(require("./routers/auth"));
dotenv_1.default.config();
const app = express_1.default();
app.use(cors_1.default());
if (!process.env.JWT_SECRET) {
    console.log('FATAL ERROR: JWT_SECRET is not defined.');
    process.exit(1);
}
app.set('port', process.env.PORT || 3000);
app.use(express_1.default.json());
// Use common 3rd-party middlewares
app.use(apiContentType_1.default);
app.use(compression_1.default());
app.use(express_1.default.json());
app.use(lusca_1.default.xframe('SAMEORIGIN'));
app.use(lusca_1.default.xssProtection(true));
app.use('/api/products', product_1.default);
app.use('/api/user', user_1.default);
app.use('/api/auth', auth_1.default);
// Custom API error handler
app.use(apiErrorHandler_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map