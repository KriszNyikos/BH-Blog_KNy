const users = [
    { user: 'admin', password: 'password' }
]

const sessions = {}

const AUTH_COOKIE = 'ssid'

function registerSession(user) {
    let id = Math.floor(Math.random() * 10000)
    sessions[id] = { user: user }
    console.log(sessions)
    return id
}

function deleteSession(cookies){
    let sessionId = cookies[AUTH_COOKIE]

    if (sessions[sessionId]) {
        delete sessions[sessionId]
    }
    return AUTH_COOKIE
}

function returnAuthor(id) {
    console.log(id ,sessions)
    return sessions[id].user
}

function authenticate(user, password) {
    console.log(`${user} vizsgálata`)
    return users.find(us => us.user === user && us.password === password)
}

function sessionFind(cookie){
    return sessions[cookie]
}

module.exports ={
    registerSession, deleteSession, returnAuthor, authenticate, AUTH_COOKIE, sessionFind
}