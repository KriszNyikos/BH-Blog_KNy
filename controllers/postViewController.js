const BlogPostService = require('../services/blogPostService')
const {blogName} = require('../config')

module.exports = class PostViewController{
   static async getReadPost(req, res){
        let post
        if(Number(req.params.id)){
        //    console.log('Az ID szám')
            post = await BlogPostService.getPostWithId(req.params.id)
        } else {
            post = await BlogPostService.getPostWithSlug(req.params.id)
        }
        if(!post){
            post = {title: 'A keresett tartalom nem található'}
        }
       
        res.render('readPostView',{post, blogName})
    }
}
