const users = [
    { email: 'admin', password: 'admin' },
    { email: 'admin@admin', password: 'password' }
]

class loginController {

    postLogin(req, res) {

        let email = req.body.email
        let password = req.body.password

        if (this.authenticate(email, password)) {
            console.log('jelszó ok')
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

module.exports = loginController