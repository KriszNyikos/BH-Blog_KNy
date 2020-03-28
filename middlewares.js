const {sessionFind} = require('./services/authenticationService')

const {AUTH_COOKIE} = require('./config.json')

module.exports = class AuthMiddleware {

   static sessionValidator(req, res, next) {
        console.log('Auth middleware running')
        const authCookie = req.cookies[AUTH_COOKIE]
        console.log(`Authentication cookie: ${authCookie}`)
    
        if (!sessionFind(authCookie)) {
            return res.status(401).send('Login required')
        }
        next()
    }

}