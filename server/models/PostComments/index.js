const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostCommentz = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "Post",
    },
    comment: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
},{ timestamps: true });

const PostComments = mongoose.model("PostComments", PostCommentz);

module.exports = PostComments;