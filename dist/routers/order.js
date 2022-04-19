"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_1 = require("../controllers/order");
const router = express_1.default.Router();
router.post('/createOrder', order_1.createOrder);
router.get('/getOrders', order_1.getAllOrders);
router.get('/getOrders/:customerEmail', order_1.findOrdersByCustomerEmail);
router.delete('/deleteOrder', order_1.deleteOrder);
exports.default = router;
//# sourceMappingURL=order.js.map