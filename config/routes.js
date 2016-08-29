var Index = require('../app/controllers/index')
var User = require('../app/controllers/user')
var Movie = require('../app/controllers/movie')
var Comment = require('../app/controllers/Comment')
var category = require('../app/controllers/category')
module.exports = function(app) {
app.use(function(req,res,next){
    var _user = req.session.user
    app.locals.user = _user;
    return next()
})

//express 中路由其实是非常简单的

//Index
app.get('/', Index.index)

//User
app.post('/user/regist', User.regist)
app.post('/user/login', User.login)
app.get('/logout', User.logout)
app.get('/signin', User.showSignin)
app.get('/signup', User.showSignup)
app.get('/admin/userlist', User.signinRequired, User.adminRequired ,User.userlist)



//Movie
app.get('/movie/:id', Movie.detail)
app.get('/admin/list', User.signinRequired, User.adminRequired ,Movie.list)
app.post('/admin/movie/new', User.signinRequired, User.adminRequired ,Movie.new)
app.get('/admin/movie', User.signinRequired, User.adminRequired ,Movie.movie)
app.get('/admin/update/:id', User.signinRequired, User.adminRequired ,Movie.update)
app.delete('/admin/list',User.signinRequired, User.adminRequired , Movie.list)

// Comment
app.post('/user/comment',User.signinRequired,Comment.save )

// category
app.get('/admin/category/new', User.signinRequired, User.adminRequired ,category.new)

app.post('/admin/category', User.signinRequired, User.adminRequired ,category.save)

app.get('/admin/category/list', User.signinRequired, User.adminRequired ,category.list)

}
