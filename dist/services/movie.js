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
const Movie_1 = __importDefault(require("../models/Movie"));
const apiError_1 = require("../helpers/apiError");
const create = (movie) => __awaiter(void 0, void 0, void 0, function* () {
    return movie.save();
});
const findById = (movieId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundMovie = yield Movie_1.default.findById(movieId);
    if (!foundMovie) {
        throw new apiError_1.NotFoundError(`Movie ${movieId} not found`);
    }
    return foundMovie;
});
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return Movie_1.default.find().sort({ name: 1, publishedYear: -1 });
});
const update = (movieId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const foundMovie = yield Movie_1.default.findByIdAndUpdate(movieId, update, {
        new: true,
    });
    if (!foundMovie) {
        throw new apiError_1.NotFoundError(`Movie ${movieId} not found`);
    }
    return foundMovie;
});
const deleteMovie = (movieId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundMovie = Movie_1.default.findByIdAndDelete(movieId);
    if (!foundMovie) {
        throw new apiError_1.NotFoundError(`Movie ${movieId} not found`);
    }
    return foundMovie;
});
exports.default = {
    create,
    findById,
    findAll,
    update,
    deleteMovie,
};
//# sourceMappingURL=movie.js.map