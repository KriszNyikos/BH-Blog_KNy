const users = [
    { user: 'admin', password: 'password' }
]

const sessions = {}

const AUTH_COOKIE = 'ssid'

class Authenticator {

    authMiddleware(req, res, next) {
        console.log('Auth middleware running')
        const authCookie = req.cookies[AUTH_COOKIE] 
        console.log(`Authentication cookie: ${authCookie}`)

        const session = sessions[authCookie]

        if (!session) { 
            res.status(401).send('Login required')
            return
        }
        next()
    }

    registerSession(user) {
        let id = Math.floor(Math.random() * 10000)
        sessions[id] = { user: user }
        console.log(sessions)
        return id
    }

    deleteSession(cookies) {
        let sessionId = cookies[AUTH_COOKIE]

        if (sessions[sessionId]) {
            delete sessions[sessionId]
        }
        return AUTH_COOKIE
    }

    returnAuthor(id) {
        console.log(id ,sessions)
        return sessions[id].user
    }
}

class LoginController {

    postLogin(req, res) {

        let user = req.body.user
        let password = req.body.password
        const auth = new Authenticator()

        if (this.authenticate(user, password)) {
            console.log('jelszó ok')
            const sessionId = auth.registerSession(user)
            res.cookie(AUTH_COOKIE, sessionId)
            return res.redirect('/admin')
        }
        console.log('jelszó nem ok')
        res.redirect('/login?error="credentials"')

    }

    authenticate(user, password) {
        console.log('belépett')
        console.log(user, password)
        return users.find(us => us.user === user && us.password === password)
    }
}

module.exports = {
    LoginController: LoginController,
    Authenticator: Authenticator
}