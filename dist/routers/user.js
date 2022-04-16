"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorization_1 = __importDefault(require("../middlewares/authorization"));
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
router.get('/me', authorization_1.default, user_1.getUser);
router.get('/', user_1.getAll);
router.post('/', user_1.registerUser);
router.patch('/:userId', authorization_1.default, user_1.updateUser);
router.delete('/:userId', authorization_1.default, user_1.deleteUser);
router.post('/suspend', authorization_1.default, user_1.ToggleUserSuspension);
router.patch('/cart/add', authorization_1.default, user_1.addCartItem);
router.patch('/cart/modify', user_1.modifyCartItem);
router.patch('/cart/increment', user_1.incrementCartItem);
router.patch('/cart/decrement', user_1.decrementCartItem);
router.patch('/cart/delete', user_1.deleteCartItem);
router.patch('/cart/clear', user_1.clearCartItems);
router.patch('/listing/add', authorization_1.default, user_1.addListing);
router.delete('/listing/delete', authorization_1.default, user_1.removeListing);
router.patch('/listing/update', authorization_1.default, user_1.updateListing);
exports.default = router;
//# sourceMappingURL=user.js.map