"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.updateListing = exports.removeListing = exports.addListing = exports.clearCartItems = exports.deleteCartItem = exports.decrementCartItem = exports.incrementCartItem = exports.modifyCartItem = exports.addCartItem = exports.ToggleUserSuspension = exports.deleteUser = exports.registerUser = exports.updateUser = exports.getAll = exports.getUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jwt = __importStar(require("jsonwebtoken"));
const lodash_1 = __importDefault(require("lodash"));
const User_1 = __importDefault(require("../models/User"));
const user_1 = __importDefault(require("../services/user"));
const product_1 = __importDefault(require("../services/product"));
const CartItem_1 = __importDefault(require("../models/CartItem"));
const Product_1 = __importDefault(require("../models/Product"));
const apiError_1 = require("../helpers/apiError");
dotenv_1.default.config();
const jwtKey = process.env.JWT_SECRET;
// ------------------------------------User Management -------------------------------------------------//
// GET the user
exports.getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //
        let user = req.user;
        user = yield user_1.default.getUser(user._id);
        res.status(200).send(user);
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
// Get all
exports.getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.getAll();
        res.status(200).send(users);
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
// Update user
exports.updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const update = req.body;
        const updatedUser = yield user_1.default.updateUser(userId, update);
        res.status(200).send(updatedUser);
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
// register new user
exports.registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        let user = yield User_1.default.findOne({ email: email });
        if (user)
            throw new apiError_1.BadRequestError('The user has already registered.');
        user = new User_1.default({ name, email, password });
        // bcrypt
        const salt = yield bcrypt_1.default.genSalt(10);
        user.password = yield bcrypt_1.default.hash(password, salt);
        yield user_1.default.saveUser(user);
        const token = jwt.sign({ _id: user._id }, jwtKey);
        res
            .header('x-auth-token', token)
            .status(201)
            .send(lodash_1.default.pick(user, ['name', 'email', '_id']));
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
// Delete user
exports.deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const deletedUser = yield user_1.default.deleteUser(userId);
        res.status(200).send(deletedUser);
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
// Toggle suspension of user account
exports.ToggleUserSuspension = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { adminEmail, targetEmail } = req.body;
        const administrator = yield User_1.default.findOne({ email: adminEmail });
        if (!administrator)
            throw new apiError_1.NotFoundError('The administrator does not exit.');
        if (!administrator.isAdmin) {
            throw new apiError_1.ForbiddenError('The operation is only allowed for administrator');
        }
        const toggledUser = yield User_1.default.findOne({ email: targetEmail });
        if (!toggledUser)
            throw new apiError_1.NotFoundError('The user does not exit.');
        toggledUser.isSuspended = !toggledUser.isSuspended;
        yield user_1.default.saveUser(toggledUser);
        res.status(200).send(toggledUser);
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
// ------------------------------------Cart Management -------------------------------------------------//
// PATCH new cart item
// And if the cart item exists, plus one to the quantity
exports.addCartItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, email } = req.body;
        const product = yield product_1.default.findById(productId);
        if (!product)
            throw new apiError_1.NotFoundError('The product does not exit.');
        const user = yield User_1.default.findOne({ email: email });
        if (!user)
            throw new apiError_1.NotFoundError('The user does not exit.');
        // Find the cart item
        const cartItem = user.cart.find((item) => item.productId.toString() == productId);
        if (cartItem) {
            const singlePrice = cartItem.price / cartItem.quantity;
            cartItem.quantity++;
            cartItem.price = cartItem.quantity * singlePrice;
            yield user_1.default.handleCartItem(user);
            res.send(cartItem);
        }
        else {
            const newItem = new CartItem_1.default({
                imageUrl: product.imageUrl,
                productName: product.name,
                productId,
                price: product.price,
                quantity: 1,
                ownerEmail: product.ownerEmail,
            });
            user.cart.push(newItem);
            yield user_1.default.handleCartItem(user);
            res.send(newItem);
        }
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
// Modify one cart item's quantity
exports.modifyCartItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, itemId, quantity } = req.body;
        const user = yield User_1.default.findOne({ email: email });
        if (!user)
            throw new apiError_1.NotFoundError('The user does not exit.');
        const cartItem = user.cart.find((item) => item._id.toString() === itemId);
        if (!cartItem)
            throw new apiError_1.NotFoundError('The cart item does not exist.');
        // get the single price of product
        const product = yield Product_1.default.findOne({ name: cartItem.productName });
        if (!product)
            throw new apiError_1.NotFoundError('The product with the same cartItem name does not exit.');
        cartItem.quantity = quantity;
        cartItem.price = quantity * product.price;
        yield user_1.default.handleCartItem(user);
        res.send(cartItem);
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
// PATCH Increment cart item
exports.incrementCartItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, itemId } = req.body;
        const user = yield User_1.default.findOne({ email: email });
        if (!user)
            throw new apiError_1.NotFoundError('The user does not exit.');
        const cartItem = user.cart.find((item) => item._id.toString() === itemId);
        if (!cartItem)
            throw new apiError_1.NotFoundError('The cart item does not exist.');
        const singlePrice = cartItem.price / cartItem.quantity;
        cartItem.quantity++;
        cartItem.price = cartItem.quantity * singlePrice;
        yield user_1.default.handleCartItem(user);
        res.send(cartItem);
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
// PATCH Decrement cart item
exports.decrementCartItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, itemId } = req.body;
        const user = yield User_1.default.findOne({ email: email });
        if (!user)
            throw new apiError_1.NotFoundError('The user does not exit.');
        const cartItem = user.cart.find((item) => item._id.toString() === itemId);
        if (!cartItem)
            throw new apiError_1.NotFoundError('The cart item does not exist.');
        const singlePrice = cartItem.price / cartItem.quantity;
        cartItem.quantity--;
        cartItem.price = cartItem.quantity * singlePrice;
        yield user_1.default.handleCartItem(user);
        res.send(cartItem);
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
// DELETE delete a cart item
exports.deleteCartItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, itemId } = req.body;
        const user = yield User_1.default.findOne({ email: email });
        if (!user)
            throw new apiError_1.NotFoundError('The user does not exit.');
        const cartItem = user.cart.find((item) => item._id.toString() === itemId);
        if (!cartItem)
            throw new apiError_1.NotFoundError('The cart item does not exist.');
        const index = user.cart.indexOf(cartItem);
        user.cart.splice(index, 1);
        yield user_1.default.handleCartItem(user);
        res.send(cartItem);
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
// Clear ALL cart items
exports.clearCartItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield User_1.default.findOne({ email: email });
        if (!user)
            throw new apiError_1.NotFoundError('The user does not exit.');
        user.cart = [];
        yield user_1.default.handleCartItem(user);
        res.send(user.cart);
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
// ------------------------------------Listing Management -------------------------------------------------//
// PATCH new listing item
exports.addListing = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product } = req.body;
        const { imageUrl, price, description, numberInStock, name, genre, ownerEmail, } = product;
        const user = yield User_1.default.findOne({ email: ownerEmail });
        if (!user)
            throw new apiError_1.NotFoundError('The user does not exit.');
        const newListing = new Product_1.default({
            imageUrl,
            price,
            description,
            numberInStock,
            name,
            genre,
            ownerEmail,
        });
        user.listings.push(newListing);
        yield user_1.default.handleListing(user);
        yield product_1.default.create(newListing);
        res.status(201).send(newListing);
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
// DELETE a listing
exports.removeListing = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, email } = req.body;
        const product = yield product_1.default.findById(productId);
        if (!product)
            throw new apiError_1.NotFoundError('Product not found');
        const user = yield User_1.default.findOne({ email: email });
        if (!user)
            throw new apiError_1.NotFoundError('The user does not exit.');
        const deletedListing = user.listings.find((l) => l._id.toString() === productId);
        if (!deletedListing)
            throw new apiError_1.NotFoundError('The listing does not exist on this user.');
        const idx = user.listings.indexOf(deletedListing);
        user.listings.splice(idx, 1);
        yield user_1.default.handleListing(user);
        yield product_1.default.deleteProduct(productId);
        res.send(deletedListing);
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
// UPDATE a listing
exports.updateListing = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, update, email } = req.body;
        const product = yield product_1.default.findById(productId);
        if (!product)
            throw new apiError_1.NotFoundError('Product not found');
        const user = yield User_1.default.findOne({ email: email });
        if (!user)
            throw new apiError_1.NotFoundError('The user does not exit.');
        const updatedListing = user.listings.find((l) => l._id.toString() === productId);
        if (!updatedListing)
            throw new apiError_1.NotFoundError('the updatedListing does not exit.');
        const idx = user.listings.indexOf(updatedListing);
        // create a copy of updated listing and update value
        const newListing = lodash_1.default.merge(user.listings[idx], update);
        console.log(newListing);
        // Replace the old listing with new listing
        // user.listings.splice(idx, 1, newListing)
        user.listings[idx] = newListing;
        yield user_1.default.handleListing(user);
        yield product_1.default.update(productId, update);
        res.send(newListing);
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
//# sourceMappingURL=user.js.map