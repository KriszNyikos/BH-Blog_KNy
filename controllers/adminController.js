const {blogName} = require('../config.json')
const BlogPostService = require('../services/blogPostService')
// A blog nevét megjeleníteni  Handlebars-ban


module.exports = class AdminController {
   static renderDashboard(req, res){
        res.render('dashBoard',{
            blogName
        })
    }

    static async renderAdminPostList (req, res){
        let post = await BlogPostService.getEveryPost()
        res.render('adminPostListView',{
            post
        })
    }
}