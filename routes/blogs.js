const express = require("express");
const BlogRouter = express.Router();

const {
  NewBlog,
  GetBlog,
  GetOneBlog,
  UpdateBlog,
  DeleteBlog,
} = require("../controllers/blogs.controller");
//   const userauth = require("../middleware/userauth.middleware");

BlogRouter.post("/addblog", NewBlog);
BlogRouter.get("/getblog", GetBlog);
BlogRouter.get("/getBlog/:blogID", GetOneBlog);
BlogRouter.put("/update/:blogID", UpdateBlog);
BlogRouter.delete("/delete/:blogID", DeleteBlog);

module.exports = BlogRouter;
