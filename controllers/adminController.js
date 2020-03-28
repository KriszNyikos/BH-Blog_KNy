const {blogName} = require('../config.json')
// A blog nevét megjeleníteni  Handlebars-ban


module.exports = class AdminController {
   static getDashboard(req, res){
        res.render('dashBoard',{
            blogName
        })
    }
}