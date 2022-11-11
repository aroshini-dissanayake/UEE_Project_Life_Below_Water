const UserBlogs = require("../models/userblogs.models");

//add new blog
const NewUserBlog = async (req, res) => {
    let newuserBlog = new UserBlogs(req.body);
    newuserBlog.save((err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: "New Blog add Successfully !!",
        UserBlogs :newuserBlog,
       });
      });
  };

  //get all blogs
  const GetUserBlog = async (req, res) => {
    UserBlogs.find().exec((err, userblogs) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
        existingUserBlogs: userblogs,
      });
    });
  };

  module.exports = {
    NewUserBlog,
    GetUserBlog,
    
  };