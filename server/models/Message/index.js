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
},{ timestamps: true });

const Message = mongoose.model("messageSchema", messageSchema);

module.exports = Message;