
const {AUTH_COOKIE} = require('./config.json')

module.exports = class AuthMiddleware {
    constructor (authenticationService){
        this.authenticationService = authenticationService
    }

     sessionValidator(req, res, next) {
        console.log('Auth middleware running')
        const authCookie = req.cookies[AUTH_COOKIE]
        console.log(`Authentication cookie: ${authCookie}`)
    
        if (!this.authenticationService.findSession(authCookie)) {
            return res.status(401).send('Login required')
        }
        next()
    }

}