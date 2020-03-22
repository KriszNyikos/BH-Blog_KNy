const { registerSession, authenticate, AUTH_COOKIE } = require('../services/authenticationService')
const {blogName} = require('../config')

function loginPost(req, res) {

    let user = req.body.user
    let password = req.body.password

    if (authenticate(user, password)) {
        console.log('jelszó rendben')
        const sessionId = registerSession(user)
        res.cookie(AUTH_COOKIE, sessionId)
        return res.redirect('/admin')
    }
    console.log(`${user} számára belépés megtagadva`)
    res.redirect('/login?error="credentials"')

}

function loginGet(req, res) {

    if (req.query.error) {
        return res.render('loginView', {
            error: `Error: invalid${req.query.error}`
        })
    }
    res.render('loginView')

}

module.exports = {
    loginGet, loginPost
}