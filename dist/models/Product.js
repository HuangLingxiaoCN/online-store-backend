"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.productSchema = new mongoose_1.default.Schema({
    imageUrl: {
        type: String,
        default: '',
    },
    name: String,
    price: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
        default: 'Donec sollicitudin molestie malesuada. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Nulla quis lorem ut libero malesuada feugiat. Donec sollicitudin molestie malesuada.',
    },
    genre: {
        type: String,
    },
    numberInStock: {
        type: Number,
        default: 1,
    },
    ownerEmail: String,
});
exports.default = mongoose_1.default.model('Product', exports.productSchema);
//# sourceMappingURL=Product.js.map