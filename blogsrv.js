const {sessionValidator}= require('./middlewares')

const {get, post}= require('./controllers/loginController')

const {renderDashboard, renderAdminPostList} = require('./controllers/adminController')

const {logout} = require('./controllers/logoutController')

const {getNewPost, postNewPost, renderPostEditView, getAllPost, updateBlogPost}= require('./controllers/BlogPostController')

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

app.get('/', getAllPost)

app.get('/login', get)

app.post('/login', post)

app.get('/admin', sessionValidator, renderDashboard)

app.get('/logout', logout)

app.get('/newPost', sessionValidator, getNewPost)

app.post('/newPost', sessionValidator, postNewPost)

app.get('/editpost/:id', sessionValidator, renderPostEditView)

app.post('/editpost/:id', sessionValidator, updateBlogPost)

app.get('/postView/:id', getReadPost)

app.get('/adminPostList', sessionValidator, renderAdminPostList)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
