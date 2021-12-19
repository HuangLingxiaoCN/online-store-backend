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
const User_1 = __importDefault(require("../models/User"));
const getUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // exclude password
    const foundUser = yield User_1.default.findById(userId).select('-password');
    if (!foundUser)
        throw new apiError_1.NotFoundError(`User ${userId} not found`);
    return foundUser;
});
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    // exclude password
    return User_1.default.find();
});
const updateUser = (userId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield User_1.default.findByIdAndUpdate(userId, update, { new: true });
    if (!foundUser)
        throw new apiError_1.NotFoundError(`User ${userId} not found`);
    return foundUser;
});
const register = (User) => __awaiter(void 0, void 0, void 0, function* () {
    return User.save();
});
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield User_1.default.findByIdAndDelete(userId);
    if (!foundUser)
        throw new apiError_1.NotFoundError(`User ${userId} not found`);
    return foundUser;
});
// add, increment, decrement
const handleCartItem = (User) => __awaiter(void 0, void 0, void 0, function* () {
    return User.save();
});
const handleListing = (User) => __awaiter(void 0, void 0, void 0, function* () {
    return User.save();
});
exports.default = {
    getUser,
    register,
    handleCartItem,
    handleListing,
    getAll,
    updateUser,
    deleteUser,
};
//# sourceMappingURL=user.js.map