"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartItemsSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.cartItemsSchema = new mongoose_1.default.Schema({
    product: {
        type: new mongoose_1.default.Schema({
            productName: String,
            price: Number,
        })
    },
    quantity: {
        type: Number,
        default: 1,
    },
});
exports.default = mongoose_1.default.model('CartItem', exports.cartItemsSchema);
//# sourceMappingURL=CartItems.js.map