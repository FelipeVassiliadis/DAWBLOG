"use strict";
/*
Mongo Post Model
Attributes: author name, author id, content, author image
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PostSchema = new mongoose_1.default.Schema({
    author: {
        type: String,
        required: "Author is required!",
    },
    authorID: {
        type: String,
        required: "AuthorID is required!",
    },
    text: {
        type: String,
        required: "Text is required!",
    },
    authorImage: {
        type: String,
        required: "Image is required"
    }
}, { timestamps: true });
module.exports = mongoose_1.default.model("Post", PostSchema);
