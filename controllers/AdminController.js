const {blogName} = require('../config.json')
// A blog nevét megjeleníteni  Handlebars-ban


module.exports = class AdminController {
    constructor (blogPostService){
        this.blogPostService = blogPostService
    }
    renderDashboard(req, res){
        res.render('dashBoard',{
            blogName
        })
    }

     async renderAdminPostList (req, res){
        let posts = await this.blogPostService.findAllPost()
        res.render('adminPostListView',{
            posts
        })
    }
}