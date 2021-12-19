"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartItems_1 = require("../controllers/cartItems");
const router = express_1.default.Router();
router.get('/', cartItems_1.findAll);
router.get('/:cartItemId', cartItems_1.findById);
router.post('/', cartItems_1.createcCartItems);
router.patch('/:cartItemId', cartItems_1.updateCartItemNumber);
router.delete('/:cartItemId', cartItems_1.deleteCartItem);
exports.default = router;
//# sourceMappingURL=cartItems.js.map