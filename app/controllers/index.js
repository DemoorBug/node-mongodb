var Movie = require('../models/movie')
var Category = require('../models/category')

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
    Category
        .find({})
        .populate({
                path: 'movies',
                options: {limit: 5}
            })
        .exec(function(err,categorys){
            console.log(categorys)
            if(err){
                console.log(err)
            }
            res.render('index',{
                title: 'imooc 首页',
                categories: categorys
            })

        })

}
