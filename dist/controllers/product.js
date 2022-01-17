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
exports.findById = exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.findAll = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const product_1 = __importDefault(require("../services/product"));
const user_1 = __importDefault(require("../services/user"));
const apiError_1 = require("../helpers/apiError");
const User_1 = __importDefault(require("../models/User"));
// GET /products
exports.findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield product_1.default.findAll());
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
// POST /products
exports.createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { imageUrl, name, price, description, genre, numberInStock, ownerEmail, } = req.body;
        const foundOwner = yield User_1.default.findOne({ email: ownerEmail });
        if (!foundOwner)
            throw new apiError_1.NotFoundError('the owner does not exist');
        const foundProduct = yield Product_1.default.findOne({ name: name });
        if (foundProduct)
            throw new apiError_1.BadRequestError('the product with given name already exists');
        const product = new Product_1.default({
            imageUrl,
            name,
            price,
            description,
            genre,
            numberInStock,
            ownerEmail,
        });
        foundOwner.listings.push(product);
        yield product_1.default.create(product);
        yield user_1.default.handleListing(foundOwner);
        res.json(product);
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
// PUT /products/:productId
exports.updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = req.body;
        const productId = req.params.productId;
        const updatedProduct = yield product_1.default.update(productId, update);
        res.json(updatedProduct);
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
// DELETE /products/:productId
exports.deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundProduct = yield product_1.default.deleteProduct(req.params.productId);
        res.status(200).json(foundProduct);
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
// GET /products/:productId
exports.findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield product_1.default.findById(req.params.productId));
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
//# sourceMappingURL=product.js.map