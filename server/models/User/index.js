const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }, 
  headline: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: false,
  },
  favoriteFood: {
    type: String,
    required: false,
  },
  favoriteHobbies: {
    type: String,
    required: false,
  },
  favoriteMovies: {
    type: String,
    required: false,
  },
  favoriteMusic: {
    type: String,
    required: false,
  },
  favoriteBooks: {
    type: String,
    required: false,
  },
  photos: {
    type: [String],
    required: false,
  },
  profilePic: {
    type: String,
    required: false,
  },
  lastLogin: {
    type: Date,
    default: Date.now
},
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  friendRequests: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  friendRequestsSent: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  friendRequestsReceived: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  likedUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  likedMe: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
  banned: {
    type: Boolean,
    default: false,
  },
  backgroundColor: {
    type: Object,
    required: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },



},{ timestamps: true });

userSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 10);
});

userSchema.statics.getLastLogin = function login(id, callback) {
  return this.findByIdAndUpdate(id, { $set : { 'lastLogin' : Date.now() },  new : true }, callback);
};

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;