const {sessionFind, AUTH_COOKIE} = require('./services/authenticationService')

function authMiddleware(req, res, next) {
    console.log('Auth middleware running')
    const authCookie = req.cookies[AUTH_COOKIE]
    console.log(`Authentication cookie: ${authCookie}`)

    if (!sessionFind(authCookie)) {
        return res.status(401).send('Login required')
    }
    next()
}

module.exports ={
    authMiddleware
}