var Comment = require('../models/comment')


exports.save = function(req,res){
   var _comment = req.body.comment
   var movieId = _comment.movie
   var comment = new Comment(_comment)
//判断回复还是提交
   if (_comment.cid) {
    Comment.findById(_comment.cid,function(err,comment){
        var reply = {
            form: _comment.from,
            to: _comment.tid,
            content: _comment.content
        }
        comment.reply.push(reply)
        comment.save(function(err,comment){
            if(err) {
            console.log(err)
            }
            res.redirect('/movie/'+ movieId)
        })
    })
   }
   else {
    comment.save(function(err,comment) {
        if(err) {
            console.log(err)
            }
            res.redirect('/movie/'+ movieId)
    })

   }
}


