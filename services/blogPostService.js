const BlogPostRepository = require("../modell/blogPostRepository");

module.exports = class BlogPostService {

  static insertNewPost(title, content, author, slug) {
    let date = new Date();
    date = `${date.getFullYear()} ${date.getMonth() + 1}. ${date.getDate()}.`;
    console.log(date);
    BlogPostRepository.insertNewData({ author, date, title, content, slug });
  }

  static updatePost(data) {
    let {id, title, content, slug, author } = data
    BlogPostRepository.updateData({id, title, content, slug, author });
  }


  static getEveryPost() {
    return BlogPostRepository.getAllData();
  }

  static getPostWithId(id) {
    return BlogPostRepository.getDataId(id);
  }

  static getPostWithSlug(slug) {
    return BlogPostRepository.getDataSlug(slug);
  }
};
