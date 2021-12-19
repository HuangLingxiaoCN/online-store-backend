"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiError_1 = require("../helpers/apiError");
const CartItems_1 = __importDefault(require("../models/CartItems"));
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return CartItems_1.default.find().sort({ price: 1, name: 1 });
});
const create = (Cart) => __awaiter(void 0, void 0, void 0, function* () {
    return Cart.save();
});
const findById = (cartItemId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundCartItem = yield CartItems_1.default.findById(cartItemId);
    if (!foundCartItem) {
        throw new apiError_1.NotFoundError(`Cart Item ${cartItemId} not found`);
    }
    return foundCartItem;
});
const updateNumber = (cartItemId, updateNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const foundCartItem = yield CartItems_1.default.findByIdAndUpdate(cartItemId, { number: updateNumber }, {
        new: true,
    });
    if (!foundCartItem) {
        throw new apiError_1.NotFoundError(`Cart Item ${cartItemId} not found`);
    }
    return foundCartItem;
});
const deleteCartItem = (cartItemId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundCartItem = yield CartItems_1.default.findByIdAndDelete(cartItemId);
    if (!foundCartItem) {
        throw new apiError_1.NotFoundError(`Cart Item ${cartItemId} not found`);
    }
    return foundCartItem;
});
exports.default = {
    findAll,
    create,
    findById,
    updateNumber,
    deleteCartItem,
};
//# sourceMappingURL=cartItems.js.map