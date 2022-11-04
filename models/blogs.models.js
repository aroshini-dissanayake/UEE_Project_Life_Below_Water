const mongoose = require("mongoose");
const BlogsSchema = mongoose.Schema({

  blogName: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  blogImage: {
    type: String,
    required: false,
  },
});

const Blogs = mongoose.model("blogs", BlogsSchema);
module.exports = Blogs
