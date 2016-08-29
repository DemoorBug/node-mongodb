var Category = require('../models/category')


//admin page
exports.new = function(req,res){
    res.render('category_admin',{
        title: 'imooc 后台分类录入页',
        category: {}
    })
}

exports.save = function(req,res){
    var _category =req.body.category
    console.log(_category)
    var category = new Category(_category)

        category.save(function(err,category) {
            if(err) {
                    console.log(err)
                }
                res.redirect('/admin/category/list')
        })
    }

exports.list = function(req,res){
    Category.fetch(function(err,categorys) {
        if (err) {
            console.log(err)
        }
        res.render('categorylist',{
        title: 'imooc 分类列表',
        categorys: categorys
        })
    })


}
