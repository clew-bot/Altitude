const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    message: {
        type: String,
        required: true,
    },
    haveRead: {
        type: Boolean,
        default: false,
    },
},{ timestamps: true });

const Message = mongoose.model("message", messageSchema);

module.exports = Message;