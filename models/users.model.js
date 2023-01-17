//user model
// require("dotenv").config();
const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const saltRounds = parseInt(process.env.SALT_ROUNDS);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    // select: false,
  },
});

// userSchema.pre("save", async function (next) {
//   // Hash the password before saving the user model
//   const user = this;
//   if (!user.isModified("password")) return next();
//   try {
//     const salt = await bcrypt.genSalt(saltRounds);
//     const hashedPassword = await bcrypt.hash(user.password, salt);
//     user.password = hashedPassword;
//     next();
//   } catch (error) {
//     return next(error);
//   }
// });

const User = mongoose.model("User", userSchema);

module.exports = User;
