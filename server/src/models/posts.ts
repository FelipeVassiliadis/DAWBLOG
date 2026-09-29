/*
Mongo Post Model
Attributes: author name, author id, content, author image
 */

import mongoose from "mongoose"

const PostSchema = new mongoose.Schema(
    {
        author: {
            type: String,
            required: "Author is required!",
        },
        authorID: {
            type: String,
            required: "AuthorID is required!",
        },
        text:{
            type: String,
            required: "Text is required!",
        },
        authorImage:{
            type: String,
            required: "Image is required"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);