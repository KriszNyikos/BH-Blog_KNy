const AuthenticationService = require("../services/authenticationService");
const BlogPostService = require("../services/blogPostService");
const { AUTH_COOKIE, blogName } = require("../config");

module.exports = class BlogPostController {

  static getNewPost(req, res) {
    let error = req.query.error ? `Error: ${req.query.error} is required` : null
    res.render("editPost", {
      error,
      header: 'New Post View'
    });
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

    res.redirect('/');
  }

  static updateBlogPost(req, res) {
    let error = "";

    if (req.body.title && req.body.content) {
      let author = AuthenticationService.returnAuthor(req.cookies[AUTH_COOKIE]);
      BlogPostService.updatePost(
        {
          id: req.body.id,
          title: req.body.title,
          content: req.body.content,
          author,
          slug: req.body.slug
        }

      );
      return res.redirect("/admin");
    }

    if (!req.body.title) {
      return res.redirect(`/editpost/:${req.query.id}?error="Title"`);
    }

    if (!req.body.content) {
      return res.redirect(`/editpost/:${req.query.id}?error="Content"`);
    }

    if (!req.body.content) {
      return res.redirect(`/editpost/:${req.query.id}?error="Slug"`);
    };

    res.redirect('/adminPostList');
  }

  static async renderPostEditView(req, res) {
    let post = await BlogPostService.getPostWithId(req.params.id)
    console.log(post)
    res.render('editPost', {
      header: 'Edit Post View',
      post,
      editor: true,
      error: req.query.error
    })
  }

  static async getAllPost(req, res) {
    let posts = await BlogPostService.getEveryPost();
    res.render("main_layout", {
      posts,
      blogName
    });
  }
};
