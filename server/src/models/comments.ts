import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
    {
        postId: {
            type: mongoose.Schema.Types.ObjectId,
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

    },
    { timestamps: true }
);

export default mongoose.model("Comment", CommentSchema);
