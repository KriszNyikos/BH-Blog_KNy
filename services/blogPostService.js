const DbService = require("./dbservice");
const DAO = require('../modell/DAO')

module.exports = class BlogPostService {

  static insertNewPost(title, content, author, slug) {
    let date = new Date();
    date = `${date.getFullYear()} ${date.getMonth() + 1}. ${date.getDate()}.`;
    console.log(date);
    DbService.writeNewData({author, date, title, content, slug});
  }

  static async getEveryPost() {
      return new Promise(function(resolve, reject) {
        let datas = DAO.getAllData();
        datas.then(array => resolve(array))
      });
  }

  static getPostWithId(id) {
    return new Promise(function(resolve, reject) {
      let post = DbService.readSinglePostWithId(id);
      post.then(p => resolve(p));
      //  console.log(post)
    });
  }

  static getPostWithSlug(slug) {
    return new Promise(function(resolve, reject) {
      let post = DbService.readSinglePostWithSlug(slug);
      post.then(p => resolve(p));
      //  console.log(post)
    });
  }
};
