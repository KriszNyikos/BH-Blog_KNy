const {get} = require('../services/blogPostService')
const {blogName} = require('../config')

async function mainLayout (req, res) {

    let posts = await get()
     res.render('main_layout', {
         posts: posts,
         blogName: blogName
     })
 }

 module.exports = {mainLayout}