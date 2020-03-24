const { readAllPosts, writeData, readSinglePost } = require('./dbservice')

function insertNewPost(title, content, author) {
    let date = new Date()
    date = `${date.getFullYear()} ${date.getMonth()}. ${date.getDay()}.`

    writeData(author, date, title, content)
}

function getAllPost() {
    return new Promise(function (resolve, reject) {
        let datas = readAllPosts()
        datas.then(array => resolve(array))
    })

}

function getPost(id) {
    return new Promise(function (resolve, reject) {
        let post = readSinglePost(id)
        post.then(p => resolve(p))
      //  console.log(post)
    })
}

module.exports = { getAllPost, insertNewPost, getPost }