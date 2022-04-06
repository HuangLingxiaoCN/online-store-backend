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
exports.createOrder = exports.findOrdersByCustomerEmail = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const order_1 = __importDefault(require("../services/order"));
const User_1 = __importDefault(require("../models/User"));
const user_1 = __importDefault(require("../services/user"));
const apiError_1 = require("../helpers/apiError");
// Get all orders with the same customer email (same buyer)
exports.findOrdersByCustomerEmail = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerEmail } = request.body;
        const foundOrders = yield order_1.default.findOrdersByEmail(customerEmail);
        // if(!foundOrders) {
        //   throw new NotFoundError(`Orders with ${customerEmail} not found`)
        // }
        if (!foundOrders) {
            response.send('not found');
        }
        response.status(200).json(foundOrders);
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
// Create an order
exports.createOrder = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { totalPrice, timestamp, customerEmail, purchasedItems } = request.body;
        const newOrder = new Order_1.default({
            totalPrice,
            timestamp,
            customerEmail,
            purchasedItems
        });
        // Also need to add the order to user collections
        const user = yield User_1.default.findOne({ email: customerEmail });
        if (!user) {
            throw new apiError_1.NotFoundError('The user with email ' + customerEmail + ' does not exist');
        }
        user.orders.push(newOrder._id);
        yield user_1.default.saveUser(user);
        yield order_1.default.createOrder(newOrder);
        response.json(newOrder);
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
//# sourceMappingURL=order.js.map