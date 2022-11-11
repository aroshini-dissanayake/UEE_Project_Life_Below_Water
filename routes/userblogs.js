const express = require("express");
const UserBlogRouter = express.Router();

const {
    NewUserBlog,
    GetUserBlog,
} = require("../controllers/userblogs.controller");
//   const userauth = require("../middleware/userauth.middleware");

UserBlogRouter.post("/adduserblog",  NewUserBlog);
UserBlogRouter.get("/getuserblog", GetUserBlog);

module.exports = UserBlogRouter;
