var User = require('../models/user')


exports.showSignup = function(req,res){
    res.render('signup',{
    title: '注册页面',
    })
}
exports.showSignin = function(req,res){
    res.render('signin',{
    title: '登录页面',
    })
}

//sigunp
exports.regist = function(req,res){
    var _user = req.body.user
    User.findOne({name: _user.name},function(err,user){
        if(err){
            console.log(err)
        }
        if(user){
            return res.redirect('/signin')
        }
        else {
            var user = new User(_user)
            user.save(function(err,user){
                if(err){
                    console.log(err)
                }

                res.redirect('/')
            })
        }
    })

}
//userlist page
exports.userlist = function(req,res){
    User.fetch(function(err,users) {
        if (err) {
            console.log(err)
        }
        res.render('userlist',{
        title: 'imooc 用户列表',
        users: users
        })
    })
}
// signin
exports.login = function(req,res){
/* /user/regist/:userid
 var _userid = req.params.userid

 /user/regist/111?userid=111
 var _userid = req.query.userid

如果是一个异步jq ajax是一个post data 截过来呢也是在body里面的
    _userid = req.body.userid

req.param('user')  这是上面的一个集合，不知道什么的时候可以直接使用 param()方法*/
    var _user = req.body.user
    var name = _user.name
    var password = _user.password

    User.findOne({name: name}, function(err,user) {
        if(err){
            console.log(err)
        }
        if(!user){
            return res.redirect('/signup')
        }
        user.comparePassword(password,function(err,isMatch){
            if(err){
                console.log(err)
            }
            if(isMatch){
                req.session.user = user
                return res.redirect('/')
            }
            else {
                return res.redirect('/signin')
            }
        })
    })
}

//logout
exports.logout = function(req,res){
    delete req.session.user

    res.redirect('/')
}



exports.signinRequired = function(req,res,next){
    var user = req.session.user

    if (!user) {
        return res.redirect('/signin')
    }

    next()
}
exports.adminRequired = function(req,res,next){
    var user = req.session.user

    if (user.role <= 10) {
        return res.redirect('/signin')
    }

    next()
}
