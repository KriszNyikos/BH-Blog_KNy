const AuthenticationService = require("../services/authenticationService");
const BlogPostService = require("../services/blogPostService");
const { AUTH_COOKIE, blogName } = require("../config");

module.exports = class NewPostController {
  static getNewPost(req, res) {
    if (req.query.error) {
      return res.render("newPost", {
        error: `Error: ${req.query.error} is required`
      });
    }
    res.render("newPost");
  }

  static postNewPost(req, res) {
    let error = "";

    if (req.body.title && req.body.content) {
      let author = AuthenticationService.returnAuthor(req.cookies[AUTH_COOKIE]);
      BlogPostService.insertNewPost(
        req.body.title,
        req.body.content,
        author,
        req.body.slug
      );
      return res.redirect("/admin");
    }

    if (!req.body.title) {
      return res.redirect('/newPost?error="Title"');
    }

    if (!req.body.content) {
      return res.redirect('/newPost?error="Content"');
    }

    if (!req.body.content) {
      return res.redirect('/newPost?error="Slug"');
    }

    res.render("main_layout", {
      posts: posts,
      blogName: blogName,
      error: error
    });
  }
};
