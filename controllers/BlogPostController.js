const BlogPost = require('../modell/BlogPost')
const { AUTH_COOKIE, blogName } = require("../config");

module.exports = class BlogPostController {
  constructor(authenticationService, blogPostService, dateService) {
    this.authenticationService = authenticationService,
      this.blogPostService = blogPostService,
      this.dateService = dateService
  }

  async renderPostView(req, res) {
    let post
    if (Number(req.params.id)) {
      post = await this.blogPostService.findPostById(req.params.id)
    } else {
      post = await this.blogPostService.findPostBySlug(req.params.id)
    }
    if (!post) {
      post = { title: 'A keresett tartalom nem található' }
    }
    //console.log(post)
    post.date = this.dateService.toString(post.date)
    res.render('readPostView', { post, blogName })
  }



  renderNewPostView(req, res) {
    let error = req.query.error ? `Error: ${req.query.error} is required` : null
    res.render("editPost", {
      error,
      header: 'New Post View'
    });
  }



  saveBlogPost(req, res) {

    if (req.body.title && req.body.content) {

      let author = this.authenticationService.returnAuthor(req.cookies[AUTH_COOKIE]);
      let insertPost = new BlogPost(undefined, author, new Date(), req.body.title, req.body.content, req.body.slug)

      //console.log(insertPost)
      this.blogPostService.insertNewPost(insertPost);
      return res.redirect("/admin");
    }

    if (!req.body.title) {
      return res.redirect('/new-post?error="Title"');
    }

    if (!req.body.content) {
      return res.redirect('/new-post?error="Content"');
    }

    if (!req.body.slug) {
      return res.redirect('/new-post?error="Slug"');
    }

    res.redirect('/');
  }



  updateBlogPost(req, res) {

    if (req.body.title && req.body.content) {
      let insertPost = new BlogPost()
      insertPost.id = req.body.id
      insertPost.author = this.authenticationService.returnAuthor(req.cookies[AUTH_COOKIE]);
      insertPost.title = req.body.title,
        insertPost.content = req.body.content,
        insertPost.slug = req.body.slug

      this.blogPostService.updatePost(insertPost);
      return res.redirect("/admin");
    }

    if (!req.body.title) {
      return res.redirect(`/edit-post/:${req.query.id}?error="Title"`);
    }

    if (!req.body.content) {
      return res.redirect(`/edit-post/:${req.query.id}?error="Content"`);
    }

    if (!req.body.content) {
      return res.redirect(`/edit-post/:${req.query.id}?error="Slug"`);
    };

    res.redirect('/adminPostList');
  }



  async renderPostEditView(req, res) {
    let post = await this.blogPostService.findPostById(req.params.id)
    //console.log(post)
    post.date = this.dateService.toString(post.date)
    res.render('editPost', {
      header: 'Edit Post View',
      post,
      editor: true,
      error: req.query.error
    })
  }



  async renderMainLayout(req, res) {
    let postArray = await this.blogPostService.findAllPost();
    let posts = postArray.map((post) => {
      post.date = this.dateService.toString(post.date)
      return post
    })
    res.render("main_layout", {
      posts,
      blogName
    });
  }
};
