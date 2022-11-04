const Blogs = require("../models/blogs.models");

//add new blog
const NewBlog = async (req, res) => {
    let newBlog = new Blogs(req.body);
    newBlog.save((err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: "New Blog add Successfully !!",
        blog :newBlog,
       });
      });
  };
  
  //get all blogs
  const GetBlog = async (req, res) => {
    Blogs.find().exec((err, blogs) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
        existingBlogs: blogs,
      });
    });
  };

  //get one blogs 
  const GetOneBlog = async (req, res) => {
    let BlogID = req.params.blogID;
    Blogs.findById(BlogID, (err, blog) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
        existingBlogs: blog,
      });
    });
  };
  
  //update blog details  
  const UpdateBlog = (req, res) => {
    Blogs.findByIdAndUpdate(
      req.params.blogID,
      {
        $set: req.body,
      },
      (err) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        return res.status(200).json({
          success: "Updated Successfully",
        });
      }
    );
  };

//delete blog 
  const DeleteBlog = (req, res) => {
    Blogs.findByIdAndRemove(req.params.blogID).exec(
      (err, deleteblogs) => {
        if (err)
          return res.status(400).json({
            message: "Deletion Unsuccessfull",
            err,
          });
  
        return res.json({
          message: "Deletion Successfull",
          deleteblogs,
        });
      }
    );
  };

  module.exports = {
    NewBlog,
    GetBlog,
    GetOneBlog,
    UpdateBlog,
    DeleteBlog,
  };
  