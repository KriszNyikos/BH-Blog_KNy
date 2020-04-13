
module.exports = class BlogPostService {
  constructor(blogPostRepository){
    this.blogPostRepository = blogPostRepository
  }


   insertNewPost(insertPost) {
    this.blogPostRepository.insert(insertPost);
  }

   updatePost(data) {
    this.blogPostRepository.update(data);
  }


   findAllPost() {
      return this.blogPostRepository.findAll()
   }


   findPostById(id) {
    return this.blogPostRepository.findById(id)
  }

   findPostBySlug(slug) {
    return this.blogPostRepository.findBySlug(slug)
  }
};
