
const loginController = require('./controllers/loginController')
const { LoginController, Authenticator } = loginController
const LoginControllerObject = new LoginController()
const AuthenticatorObject = new Authenticator()

const postController = require('./controllers/postController')
const { PostController} = postController
const PostControllerObject = new PostController()


const express = require('express')
const app = express()
const port = 3000
const cookieParser = require('cookie-parser')


const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));

app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs());

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

const blogName = 'Blog oldal'


app.get('/', async (req, res) => {

   let posts = await PostControllerObject.get()
    res.render('main_layout', {
        posts: posts,
        blogName: blogName
    })
})

app.get('/login', (req, res) => {

    let error = ""
    if (req.query.error) {
        error = `Error: invalid${req.query.error}`
    }

    res.render('loginView', {
        error: error
    })
})


app.post('/login', LoginControllerObject.postLogin.bind(LoginControllerObject))


app.get('/admin', AuthenticatorObject.authMiddleware, (req, res) => {
    res.render('dashBoard')
})


app.get('/logout', (req, res) => {
    let cookieName = AuthenticatorObject.deleteSession(req.cookies)
    res.clearCookie(cookieName)
    res.redirect('/login')
})

app.get('/newPost', AuthenticatorObject.authMiddleware, (req, res) => {
    if (req.query.error) {
        return res.render('newPost', {
            error: `Error: ${req.query.error} is required`
        })
    }
    res.render('newPost')
})

app.post('/newPost', AuthenticatorObject.authMiddleware, (req, res) => {

    let error= ""

    if (req.body.title && req.body.content) {
        let author = AuthenticatorObject.returnAuthor(req.cookies['ssid'])
        PostControllerObject.post(req.body.title, req.body.content, author)
        return res.redirect('/admin')
    }

    if(!req.body.title){
        return res.redirect('/newPost?error="Title"')
    }

    if(!req.body.title){
        return res.redirect('/newPost?error="Content"')
    }

    res.render('main_layout', {
        posts: posts,
        blogName: blogName,
        error: error
    })

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
