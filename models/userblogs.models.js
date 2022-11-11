const mongoose = require("mongoose");
const UserBlogsSchema = mongoose.Schema({

  blogNamea: {
    type: String,
    required: true,
  },

  blogurl: {
    type: String,
    required: true,
  },

  blogImage: {
    type: String,
    required: false,
  },
});

const UserBlogs = mongoose.model("userblogs", UserBlogsSchema);
module.exports = UserBlogs
