const express = require("express");
const UserRouter = express.Router();
const userauth = require("../middleware/userauth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  RegisterUser,
  LoginUser,
  GetUserProfile,
  UpdateProfile,
  ProfileDelete,
} = require("../controllers/user.controller");

UserRouter.post("/registeruser", RegisterUser);
UserRouter.post("/login", LoginUser);
UserRouter.get("/userprofile/:id", userauth, GetUserProfile);
UserRouter.put("/updateuser", userauth, UpdateProfile);
UserRouter.delete("/deleteuser/:id", ProfileDelete);

module.exports = UserRouter;
