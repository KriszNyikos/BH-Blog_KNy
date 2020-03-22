const {blogName} = require('../config')

function getDashboard(req, res){
    res.render('dashBoard')
}

module.exports = {getDashboard}