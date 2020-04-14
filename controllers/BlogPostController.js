const BlogPost = require('../modell/BlogPost')
const { AUTH_COOKIE, blogName } = require("../config");


module.exports = class BlogPostController {
  constructor(authenticationService, blogPostService, dateService, archiveService) {
    this.authenticationService = authenticationService,
      this.blogPostService = blogPostService,
      this.dateService = dateService
    this.archiveService = archiveService
  }

  async renderPostView(req, res) {
    let post
    if (Number(req.params.id)) {
      post = await this.blogPostService.findPostById(req.params.id)
    } else {
      post = await this.blogPostService.findPostBySlug(req.params.id)
    }
    if (!post || !post.date) {
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
    if (req.body.title && req.body.content && req.body.slug) {


      let author = this.authenticationService.returnAuthor(req.cookies[AUTH_COOKIE]);
      let insertPost = new BlogPost(null, author, new Date(), req.body.title, req.body.content, req.body.slug)

      if (req.query.draft) {
        insertPost.date = null
      }

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

    if (req.body.title && req.body.content && req.body.slug) {


      let author = this.authenticationService.returnAuthor(req.cookies[AUTH_COOKIE]);
      let insertPost = new BlogPost(req.body.id, author, new Date(), req.body.title, req.body.content, req.body.slug)

      if (req.query.draft) {
        insertPost.date = null
      }

      this.blogPostService.updatePost(insertPost);
      return res.redirect("/admin");
    }

    if (!req.body.title) {
      return res.redirect(`/edit-post/:${req.query.id}?error="Title"`);
    }

    if (!req.body.content) {
      return res.redirect(`/edit-post/:${req.query.id}?error="Content"`);
    }

    if (!req.body.slug) {
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
    let postArray
    let archiveArray
    let keyword

    if(req.body.keyword){
      postArray = await this.blogPostService.findByWord(req.body.keyword);
      archiveArray = await this.blogPostService.findAllPost();
      keyword = req.body.keyword
    } else {
      postArray = await this.blogPostService.findAllPost();
      archiveArray = postArray
    }

    let posts = this.blogPostService.sortDateDESC(postArray)
    posts = posts.filter(post => post.date)
    posts = posts.map(post => new BlogPost(post.id, post.author, this.dateService.toString(post.date), post.title, post.content, post.slug))
    
    let archive = this.blogPostService.sortDateDESC(archiveArray)
    archive = archive.filter(post => post.date)
    archive = this.blogPostService.archiveList(archive)

    
    res.render("main_layout", {
      posts,
      blogName,
      archive,
      keyword
    });
  }
};
