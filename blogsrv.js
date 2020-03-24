const { authMiddleware } = require('./middlewares')

const { mainLayout } = require('./controllers/rootController')

const { loginGet, loginPost } = require('./controllers/loginController')

const { getDashboard } = require('./controllers/adminController')

const { logout } = require('./controllers/logoutController')

const { getNewPost, postNewPost } = require('./controllers/newPostController')

const {getReadPost} =require('./controllers/postViewController')


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

app.get('/', mainLayout)

app.get('/login', loginGet)

app.post('/login', loginPost)

app.get('/admin', authMiddleware, getDashboard)

app.get('/logout', logout)

app.get('/newPost', authMiddleware, getNewPost)

app.post('/newPost', authMiddleware, postNewPost)

app.get('/readPostView/:id', getReadPost)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
