const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    post: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "PostComments",
        },
    ],
    replies: 
        {
            type: Number,
            default: 0,
        },
},{ timestamps: true });

const Post = mongoose.model("Post", postSchema);

module.exports = Post;