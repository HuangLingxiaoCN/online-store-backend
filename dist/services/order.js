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
const Order_1 = __importDefault(require("../models/Order"));
const createOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    return order.save();
});
const findOrdersByEmail = (customerEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const foundOrders = yield Order_1.default.find({ customerEmail: customerEmail });
    if (!foundOrders) {
        throw new Error('The customer has no order history');
    }
    return foundOrders;
});
const findOrderById = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundOrder = yield Order_1.default.findById(orderId);
    if (!foundOrder) {
        throw new apiError_1.NotFoundError('The order ' + orderId + ' does not exist');
    }
    return foundOrder;
});
const deleteOrderById = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    yield Order_1.default.findByIdAndDelete(orderId);
});
exports.default = {
    createOrder,
    findOrdersByEmail,
    findOrderById,
    deleteOrderById,
};
//# sourceMappingURL=order.js.map