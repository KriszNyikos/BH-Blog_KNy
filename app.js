
const users = [{ user: "admin", password: "password" }, { user: "admin2", password: "password2" }];
const sessions = {};

const sqlite3 = require("sqlite3").verbose(); 

const db = new sqlite3.Database("./modell/postsDB.db", (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Connected to the postsDB database.");
    }
  )


const BlogPostRepository = require('./repository/BlogPostRepository')
const blogPostRepository = new BlogPostRepository(db) 

const AuthenticationService = require('./services/AuthenticationService')
const authenticationService = new AuthenticationService(users, sessions) 

const BlogPostService = require('./services/BlogPostService')
const blogPostService = new BlogPostService(blogPostRepository)

const AuthMiddleware = require('./Middlewares')
const authMiddleware = new AuthMiddleware(authenticationService)

const LoginLogoutController = require('./controllers/LoginLogoutController')
const loginLogoutController = new LoginLogoutController(authenticationService)

const AdminController = require('./controllers/AdminController')
const adminController = new AdminController(blogPostService)

const BlogPostController = require('./controllers/BlogPostController')
const blogPostController = new BlogPostController(authenticationService, blogPostService)



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

app.get('/', blogPostController.renderMainLayout.bind(blogPostController))

app.get('/login', loginLogoutController.renderLoginView.bind(loginLogoutController))

app.post('/login', loginLogoutController.loginUser.bind(loginLogoutController))

app.get('/logout', loginLogoutController.logoutUser.bind(loginLogoutController))

app.get('/admin', authMiddleware.sessionValidator.bind(authMiddleware), adminController.renderDashboard.bind(adminController))

app.get('/new-post', authMiddleware.sessionValidator.bind(authMiddleware), blogPostController.renderNewPostView.bind(blogPostController))

app.post('/new-post', authMiddleware.sessionValidator.bind(authMiddleware), blogPostController.saveBlogPost.bind(blogPostController))

app.get('/edit-post/:id', authMiddleware.sessionValidator.bind(authMiddleware), blogPostController.renderPostEditView.bind(blogPostController))

app.post('/edit-post/:id', authMiddleware.sessionValidator.bind(authMiddleware), blogPostController.updateBlogPost.bind(blogPostController))

app.get('/post-view/:id', blogPostController.renderPostView.bind(blogPostController))

app.get('/admin-post-list', authMiddleware.sessionValidator.bind(authMiddleware), adminController.renderAdminPostList.bind(adminController))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
