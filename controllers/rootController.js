const BlogPostService = require("../services/blogPostService");
const { blogName } = require("../config.json");

module.exports = class RootController {
  static async getAllPost(req, res) {
    let posts = await BlogPostService.getEveryPost();
    res.render("main_layout", {
      posts,
      blogName
    });
  }
};
