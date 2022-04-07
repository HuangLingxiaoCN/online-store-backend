"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CartItem_1 = require("./CartItem");
const orderSchema = new mongoose_1.default.Schema({
    totalPrice: Number,
    timestamp: String,
    customerEmail: String,
    purchasedItems: [CartItem_1.cartItemSchema],
    billingInfo: {
        fullName: String,
        country: String,
        streetAddress: String,
        phoneNumber: String,
        postalCode: String,
        city: String,
        paymentMethod: String,
    },
});
exports.default = mongoose_1.default.model('Order', orderSchema);
//# sourceMappingURL=Order.js.map