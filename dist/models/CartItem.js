"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartItemSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.cartItemSchema = new mongoose_1.default.Schema({
    imageUrl: {
        type: String,
        default: '',
    },
    productName: String,
    productId: mongoose_1.default.Schema.Types.ObjectId,
    price: Number,
    quantity: {
        type: Number,
        default: 1,
    },
    ownerEmail: String,
});
exports.default = mongoose_1.default.model('CartItem', exports.cartItemSchema);
//# sourceMappingURL=CartItem.js.map