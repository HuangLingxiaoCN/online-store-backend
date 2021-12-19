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
exports.deleteCartItem = exports.updateCartItemNumber = exports.createcCartItems = exports.findById = exports.findAll = void 0;
const CartItems_1 = __importDefault(require("../models/CartItems"));
const cartItems_1 = __importDefault(require("../services/cartItems"));
const Product_1 = __importDefault(require("../models/Product"));
const apiError_1 = require("../helpers/apiError");
// GET ALL
exports.findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield cartItems_1.default.findAll());
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
// GET ONE /cartItems/:cartItemId
exports.findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield cartItems_1.default.findById(req.params.cartItemId));
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
// POST
exports.createcCartItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, number } = req.body;
        const product = yield Product_1.default.findById(productId);
        if (!product)
            return res.status(404).send('Invalid product');
        const cart = new CartItems_1.default({
            product: {
                productName: product.name,
                price: product.price
            },
            number,
        });
        yield cartItems_1.default.create(cart);
        res.status(201).json(cart);
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
// PATCH /cartItems/:cartItemId
exports.updateCartItemNumber = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartItemId = req.params.cartItemId;
        const updateNumber = req.body.number;
        const updatedCartItem = yield cartItems_1.default.updateNumber(cartItemId, updateNumber);
        res.json(updatedCartItem);
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
// DELETE /cartItems/:cartItemId
exports.deleteCartItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield cartItems_1.default.deleteCartItem(req.params.cartItemId));
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
//# sourceMappingURL=cartItems.js.map