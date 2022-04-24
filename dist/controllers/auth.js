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
exports.isAdmin = exports.authenticateUser = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const apiError_1 = require("../helpers/apiError");
dotenv_1.default.config();
const jwtKey = process.env.JWT_SECRET;
// POST
exports.authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email: email });
        if (!user) {
            throw new apiError_1.NotFoundError('The account does not exist');
        }
        console.log(password);
        console.log(bcrypt_1.default.compareSync(password, user.password));
        // console.log(bcrypt.compare(password, user.password)) is not correct
        const passwordIsValid = bcrypt_1.default.compareSync(password, user.password);
        if (!passwordIsValid) {
            throw new apiError_1.UnauthorizedError('Login fails. Please check you email or password');
        }
        if (user.isSuspended) {
            throw new apiError_1.ForbiddenError('Account suspended. Please contact the administrator');
        }
        const token = jwt.sign({ _id: user._id }, jwtKey);
        // res.status(200).json({ token, email })
        res.status(200).json(token);
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
// isAdmin
exports.isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email: email });
        if (!user) {
            throw new apiError_1.UnauthorizedError('Login fails');
        }
        const passwordIsValid = bcrypt_1.default.compareSync(password, user.password);
        if (!passwordIsValid) {
            throw new apiError_1.UnauthorizedError('Login fails');
        }
        // check if the user's isAdmin property
        if (!user.isAdmin) {
            throw new apiError_1.ForbiddenError('Access Denied');
        }
        const token = jwt.sign({ _id: user._id, isAdmin: true }, jwtKey);
        res.status(200).send(token);
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
//# sourceMappingURL=auth.js.map