const {getPost} = require('../services/blogPostService')
const {blogName} = require('../config')

async function getReadPost(req, res){
    let post = await getPost(req.params.id)
    res.render('readPostView',{post, blogName})
}

module.exports ={
    getReadPost
}