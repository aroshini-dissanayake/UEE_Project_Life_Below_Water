const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// @Action - encrypt the password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(8);
  this.password = await bcrypt.hash(this.password, salt);
});

// @Action - Get auth token
UserSchema.methods.generateAuthToken = async function () {
  const User = this;
  const token = jwt.sign({ _id: User._id }, "jwtSecret");
  User.tokens = User.tokens.concat({ token });
  await User.save();
  return token;
};

// @Action - Find staff by credentials
UserSchema.statics.findByCredentials = async (email, password) => {
  const User1 = await user.findOne({ email });
  if (!User1) {
    throw new Error("Please enter authorized Email");
  }
  const isMatch = await bcrypt.compare(password, User1.password);
  if (!isMatch) {
    throw new Error("Password is not matched");
  }
  return User1;
};

const user = mongoose.model("user", UserSchema);
module.exports = user;
