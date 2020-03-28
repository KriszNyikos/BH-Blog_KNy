const DAO = require('../modell/DAO')

module.exports = class DbService {

  static writeNewData(data) {
    const {author, date, title, content, slug} = data
    DAO.InsertNewData({author, date, title, content, slug})
  }

  static readSinglePostWithId(id) {
    return new Promise(function(resolve, reject) {
     let post = DAO.getDataId(id)
      post.then(p => resolve(p)).catch(err => reject(err))
    });
  }

  static async readSinglePostWithSlug(slug) {
    // console.log(slug)
    return new Promise(function(resolve, reject) {
      let post = DAO.getDataSlug(slug)
      post.then(p => resolve(p)).catch(err => reject(err))
    });
  }
};
