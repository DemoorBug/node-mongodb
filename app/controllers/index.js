var Movie = require('../models/movie')

//express 中路由其实是非常简单的

//index page
// app.get('/',function(req,res){
//     console.log(req.session.user)
//     Movie.fetch(function(err,movies) {
//         if (err) {
//             console.log(err)
//         }
//         res.render('index',{
//             title: 'imooc 首页',
//             movies : movies
//         })
//     })
// })

exports.index = function(req,res){
  console.log(req.session.user)
    Movie.fetch(function(err,movies) {
        if (err) {
            console.log(err)
        }
        res.render('index',{
            title: 'imooc 首页',
            movies : movies
        })
    })  
}
