const {returnAuthor, AUTH_COOKIE} = require('../services/authenticationService')
const {insertNewPost} = require('../services/blogPostService')
const {blogName} = require('../config')


function getNewPost (req, res){
    if (req.query.error) {
        return res.render('newPost', {
            error: `Error: ${req.query.error} is required`
        })
    }
    res.render('newPost')
}

function postNewPost (req, res) {

    let error= ""

    if (req.body.title && req.body.content) {
        let author = returnAuthor(req.cookies[AUTH_COOKIE])
        insertNewPost(req.body.title, req.body.content, author, req.body.slug)
        return res.redirect('/admin')
    }

    if(!req.body.title){
        return res.redirect('/newPost?error="Title"')
    }

    if(!req.body.content){
        return res.redirect('/newPost?error="Content"')
    }

    if(!req.body.content){
        return res.redirect('/newPost?error="Slug"')
    }

    res.render('main_layout', {
        posts: posts,
        blogName: blogName,
        error: error
    })

}


module.exports = {
    getNewPost,
    postNewPost,
}