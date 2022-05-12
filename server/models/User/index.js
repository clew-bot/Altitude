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
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 10);
});

userSchema.statics.getLastLogin = function login(id, callback) {
  return this.findByIdAndUpdate(id, { $set : { 'lastLogin' : Date.now() },  new : true }, callback);
};

userSchema.methods.checkPassword = function (password) {
  //.compare returns promise .compareSync is synchrously //
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;