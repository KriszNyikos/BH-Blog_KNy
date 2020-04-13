const { blogName } = require('../config.json')
// A blog nevét megjeleníteni  Handlebars-ban


module.exports = class AdminController {
    constructor(blogPostService, dateService) {
        this.blogPostService = blogPostService
        this.dateService = dateService
    }
    renderDashboard(req, res) {
        res.render('dashBoard', {
            blogName
        })
    }

    async renderAdminPostList(req, res) {
        let postArray = await this.blogPostService.findAllPost()
        let posts = this.blogPostService.sortDateASC(postArray)
        posts = postArray.map((post) => {
            post.date = this.dateService.toString(post.date)
            return post
        })
        res.render('adminPostListView', {
            posts
        })
    }
}