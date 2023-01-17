// blog post model
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: String,
  author: String,
});

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  comments: [commentSchema],
});

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

module.exports = BlogPost;
