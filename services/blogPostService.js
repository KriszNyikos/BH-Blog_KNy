const { readAllPosts, writeData, readSinglePost, readSinglePostSlug } = require('./dbservice')

function insertNewPost(title, content, author, slug) {
    let date = new Date()
    date = `${date.getFullYear()} ${date.getMonth()+1}. ${date.getDate()}.`
    console.log(date)
    writeData(author, date, title, content)
}

function getAllPost() {
    return new Promise(function (resolve, reject) {
        let datas = readAllPosts()
        datas.then(array => resolve(array))
    })

}

function getPostId(id) {
    return new Promise(function (resolve, reject) {
        let post = readSinglePost(id)
        post.then(p => resolve(p))
      //  console.log(post)
    })
}

function getPostSlug(slug) {
    return new Promise(function (resolve, reject) {
        let post = readSinglePostSlug(slug)
        post.then(p => resolve(p))
      //  console.log(post)
    })
}

module.exports = { getAllPost, insertNewPost, getPostId, getPostSlug }