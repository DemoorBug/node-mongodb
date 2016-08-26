var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var CommentSchema = new Schema({
    movie: {type: ObjectId, ref: 'Movie'},
    from: {type: ObjectId, ref: 'User'},
    to: {type: ObjectId, ref: 'User'},
    content: String,
    meta: {
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updateAt : {
            type: Date,
            default: Date.now()
        }
    }
})
//meta 更新时间的记录

//每次在存储一个数据之前，都会来调用下这个方法
CommentSchema.pre('save',function(next){
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    }else {
        this.meta.updateAt = Date.now()
    }
    next()
})

CommentSchema.statics = {
    fetch : function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById : function (id,cb) {
        return this
            .findOne({_id: id})
            .sort('meta.updateAt')
            .exec(cb)
    }
}




module.exports = CommentSchema