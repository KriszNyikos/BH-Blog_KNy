const { blogName, dbPath } = require('../config.json')
const fs = require('fs')
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

    renderDbView(req, res) {
        const dbPath = JSON.parse(fs.readFileSync("./config.json")).dbPath
        res.render('adminDbView', {
            dbPath
        })
    }

    updateDbPath(req, res) {
        let data = JSON.parse(fs.readFileSync("./config.json"))
       // console.log(JSON.parse(data), req.body.path)
        data.dbPath = req.body.path
        data = JSON.stringify(data);
        fs.writeFileSync('config.json', data);

        res.render('dashboard')
    }
}