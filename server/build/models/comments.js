"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CommentSchema = new mongoose_1.default.Schema({
    postId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    authorID: {
        type: String,
        required: "AuthorID is required!",
    },
    author: {
        type: String,
        required: "Author is required!",
    },
    text: {
        type: String,
        required: "Text is required!",
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("Comment", CommentSchema);
