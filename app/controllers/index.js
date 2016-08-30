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
                options: {limit: 4}
            })
        .exec(function(err,categorys){
            if(err){
                console.log(err)
            }
            res.render('index',{
                title: 'imooc 首页',
                categories: categorys
            })

        })

}

exports.search = function(req,res){
    var catId = req.query.cat
    var search = req.query.search
    var page = parseInt(req.query.p,10) || 0
    var count = 2
    var index = page * count
    if(catId){
        Category
            .find({_id: catId})
            .populate({
                    path: 'movies',
                    select: 'title poster'
                    // options: {limit: 2, skip: index}  此代码无效，直接写一个 虽然不知道什么逻辑
                })
            .exec(function(err,categorys){
                if(err){
                    console.log(err)
                }
                var category = categorys[0] || {}
                // 直接编写的逻辑
                var movies = category.movies || []
                var results = movies.slice(index,index + +count)

                res.render('results',{
                    title: 'imooc 结果列表页面',
                    keyword: category.name,
                    currentPage: (page + 1),
                    totalPage: Math.ceil(movies.length / count),
                    movies: results,
                    query: 'cat=' + catId
                })

            })
    }
    else {
        Movie
            .find({title: new RegExp(search+'.*','i')})
            .exec(function(err,movies){
                if(err){
                    console.log(err)
                }
                var results = movies.slice(index,index + +count)

                res.render('results',{
                    title: 'imooc 结果列表页面',
                    keyword: search,
                    currentPage: (page + 1),
                    totalPage: Math.ceil(movies.length / count),
                    movies: results,
                    query: 'search=' + search
                })
            })
    }
}
