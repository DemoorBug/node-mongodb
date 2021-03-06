var _ = require('underscore')
var Movie = require('../models/movie')
var Category = require('../models/category')
var Comment = require('../models/comment')
var fs = require('fs')
var path = require('path')

//detail page
exports.detail = function(req,res){
    var id = req.params.id;
    Movie.update({_id:id},{$inc: {pv:1}},function(err){
        if(err){
            console.log(err)
        }
    })
    Movie.findById(id,function(err,movie){
    // Comment.find({movie: id},function(err,comments){  //这个不能拿到用户名
    //要做一点手脚，关联 user数据
    Comment
        .find({movie: id})
        .populate('from','name')
        //第一个参数from 第二个参数 生成的字段
        //给from增加一个 字段，去user表里面查 怎么知道我查的是什么表，还有什么属性？
        .populate('reply.from reply.to','name')
        .exec(function(err,comments){
        //exec()是一个回调
            res.render('detail',{
                title: 'imooc'+ movie.title,
                movie: movie,
                comments: comments
            })
    })

    })
}

//list page
exports.list = function(req,res){
    Movie.fetch(function(err,movies) {
        if (err) {
            console.log(err)
        }
        res.render('list',{
        title: 'imooc 列表',
        movies: movies
        })
    })


}


//存储
exports.savePoster = function(req,res,next) {
    var posterData = req.files.uploadPoster
    console.log(req.files)
    var filePath = posterData.path
    var originalFilename = posterData.originalFilename
    if (originalFilename) {
        fs.readFile(filePath,function(err,data){
            var timestamp = Date.now()
            var type = posterData.type.split('/')[1]
            var poster = timestamp + '.' + type
            var newPath = path.join(__dirname,'../../','/public/upload/'+poster)
            fs.writeFile(newPath,data,function(err){
                req.poster = poster;
                next()
            })
        })
    }
    else {
        next()
    }
}


exports.new = function(req,res){
    var id =req.body.movie._id
    var movieObj = req.body.movie
    var _movie
    //上传
    if(req.poster) {
        movieObj.poster = req.poster
    }

    if (id) {
        Movie.findById(id,function(err,movie){
            if(err) {
                console.log(err)
            }

            _movie = _.extend(movie,movieObj)
            _movie.save(function(err,movie) {
                if(err) {
                    console.log(err)
                }

                res.redirect('/movie/'+movie._id)
            })
        })
    }else {
        // _movie = new Movie({
        //     doctor:movieObj.doctor,
        //     title:movieObj.title,
        //     country:movieObj.country,
        //     language:movieObj.language,
        //     year:movieObj.year,
        //     poster:movieObj.poster,
        //     summary:movieObj.summary,
        //     flash:movieObj.flash,
        // })

        _movie = new Movie(movieObj)

        var categoryId = movieObj.category
        var categoryName = movieObj.categoryName

        _movie.save(function(err,movie) {
            if(err) {
                    console.log(err)
                }
            if(categoryId){
                Category.findById(categoryId,function(err,category){
                    console.log('ons'+category)
                    console.log('onsa'+category.movies)
                    category.movies.push(movie._id)
                    category.save(function(err,category){
                        res.redirect('/movie/'+movie._id)
                    })
                })
            }
            else if(categoryName){
                var category = new Category({
                    name: categoryName,
                    movies: [movie._id]
                })
                category.save(function(err,category){
                    //这样也可以直接向数据库加东西啊
                    movie.category = category._id

                    movie.save(function(err,movie){
                        res.redirect('/movie/'+movie._id)
                    })
                })
            }
        })
    }
}


//admin page
exports.movie = function(req,res){
    Category.find({},function(err,categories){
        res.render('admin',{
            title: 'imooc 后台',
            categories: categories,
            movie : {}
        })
    })
}

exports.update = function(req,res){
    var id = req.params.id
    if(id) {
        Movie.findById(id,function(err,movie){
            Category.find({},function(err,categories){
                res.render('admin',{
                    title:'imooc 后台更新',
                    movie:movie,
                    categories: categories
                })
            })
        })
    }

}


//list delete movie
exports.del =  function(req,res){
    var id = req.query.id;
    if(id) {
        Movie.remove({_id:id},function(err,movie){
            if(err){
                console.log(err)
            }
            else {
                res.json({success:1})
            }
        })
    }

}

