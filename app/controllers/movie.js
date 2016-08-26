var _ = require('underscore')
var Movie = require('../models/movie')
var Comment = require('../models/comment')

//detail page
exports.detail = function(req,res){
    var id = req.params.id;
    Movie.findById(id,function(err,movie){
    // Comment.find({movie: id},function(err,comments){  //这个不能拿到用户名
    //要做一点手脚，关联 user数据
    Comment
        .find({movie: id})
        .populate('from','name')
        //第一个参数from 第二个参数 生成的字段
        //给from增加一个 字段，去user表里面查 怎么知道我查的是什么表，还有什么属性？
        .exec(function(err,comments){
        //exec()是一个回调
        console.log(comments)
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

exports.new = function(req,res){
    var id =req.body.movie._id
    var movieObj = req.body.movie
    var _movie
    if (id !== 'undefined') {
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
        _movie = new Movie({
            doctor:movieObj.doctor,
            title:movieObj.title,
            country:movieObj.country,
            language:movieObj.language,
            year:movieObj.year,
            poster:movieObj.poster,
            summary:movieObj.summary,
            flash:movieObj.flash,
        })

        _movie.save(function(err,movie) {
            if(err) {
                    console.log(err)
                }

                res.redirect('/movie/'+movie._id)
        })
    }
}


//admin page
exports.movie = function(req,res){
    res.render('admin',{
        title: 'imooc 后台',
        movie : {
            title : '',
            doctor : '',
            country : '',
            year : '',
            poster : '',
            flash : '',
            summary : '',
            language : ''
        }
    })
}

exports.update = function(req,res){
    var id = req.params.id
    if(id) {
        Movie.findById(id,function(err,movie){
            res.render('admin',{
                title:'imooc 后台更新',
                movie:movie
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

