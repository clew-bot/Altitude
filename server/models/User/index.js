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
});

userSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 10);
});

userSchema.methods.checkPassword = function (password) {
  //.compare returns promise .compareSync is synchrously //
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;