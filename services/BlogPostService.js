
module.exports = class BlogPostService {
  constructor(blogPostRepository){
    this.blogPostRepository = blogPostRepository
  }

   insertNewPost(insertPost) {
    let date = new Date();
    date = `${date.getFullYear()} ${date.getMonth() + 1}. ${date.getDate()}.`;
    console.log(date);
    insertPost.date = date
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
