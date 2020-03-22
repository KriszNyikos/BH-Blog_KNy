const {blogName} = require('../config')

const {deleteSession} = require('../services/authenticationService')

function logout(req, res) {
    let cookieName = deleteSession(req.cookies)
    res.clearCookie(cookieName)
    res.redirect('/login')
}

module.exports = {logout}