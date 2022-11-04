const jwt = require("jsonwebtoken");
const user = require("../models/users.models");

const userauth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const decode = jwt.verify(token, "jwtSecret");
    const User = await user.findOne({
      _id: decode._id,
      "tokens.token": token,
    });
    if (!User) {
      throw new Error("Please Authenticated");
    }
    req.token = token;
    req.User = User;
    next();
  } catch (error) {
    res.status(401).send({ message: error.message });
    console.log("Error in auth.js middleware ", error.message);
  }
};

module.exports = userauth;
