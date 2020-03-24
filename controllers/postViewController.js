const {getPostId, getPostSlug} = require('../services/blogPostService')
const {blogName} = require('../config')

async function getReadPost(req, res){
    let post
    if(Number(req.params.id)){
    //    console.log('Az ID szám')
        post = await getPostId(req.params.id)
    } else {
        post = await getPostSlug(req.params.id)
    }
    if(!post){
        post = {title: 'A keresett tartalom nem található'}
    }
   
    res.render('readPostView',{post, blogName})
}

module.exports ={
    getReadPost
}