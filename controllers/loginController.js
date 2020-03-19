const users = [
    { email: 'admin@admin', password: 'password' }
]

const sessions = {}

const AUTH_COOKIE = 'ssid'

class Authenticator {

    authMiddleware(req, res, next) {
        console.log('Auth middleware running')
        const authCookie = req.cookies[AUTH_COOKIE] // (1)
        console.log(`Authentication cookie: ${authCookie}`)
    
        const session = sessions[authCookie]

        if (!session) { // (2)
            res.status(401).send('Login required')
            return
        }
        next()
    }

    registerSession(email) {
        let id = Math.floor(Math.random() * 10000)
        sessions[id] = {email: email}
        console.log(sessions)
        return id
    }

    deleteSession(cookies){
       let sessionId = cookies[AUTH_COOKIE] 

        if (sessions[sessionId]) {
            delete sessions[sessionId]
        }
        return AUTH_COOKIE
    }
}

class LoginController {

    postLogin(req, res) {

        let email = req.body.email
        let password = req.body.password
        const auth = new Authenticator()

        if (this.authenticate(email, password)) {
            console.log('jelszó ok')
            const sessionId = auth.registerSession(email)
            res.cookie(AUTH_COOKIE, sessionId)
            return res.redirect('/admin')
        }
        console.log('jelszó nem ok')
        res.redirect('/login?error="credentials"')

    }

    authenticate(email, password) {
        console.log('belépett')
        console.log(email, password)
        return users.find(user => user.email === email && user.password === password)
    }
}

module.exports = {
    LoginController: LoginController,
    Authenticator: Authenticator
}