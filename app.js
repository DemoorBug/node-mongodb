var express = require('express')
var path = require('path');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser') 
var session = require('express-session')
var mongStore = require('connect-mongo')(session);
var morgan = require('morgan')

var bodyParser = require('body-parser');
var port = process.env.PORT || 3000
var app = express();

var dbUrl = 'mongodb://localhost/imooc'

mongoose.connect(dbUrl)
//将这个实例赋给一个变量， 再来设置视图根目录

app.set('views','./app/views/pages')
app.set('view engine','jade')    //设置默认的模板引擎
app.use(bodyParser.urlencoded({ extended: true })) //表单数据格式化
app.use(cookieParser())
app.use(session({
 	secret: 'imovie',
 	resave:false,
 	saveUninitialized: false,
 	store: new mongStore({
 		url: dbUrl,
 		collection: 'sessions'
 	})
}))
/**
 * :method 请求类型  :url URL  :status状态码 :response-time 请求的响应时间
 * 
 */
if('development' === app.get('env')) {
	app.set('showStackError',true)
	app.use(morgan(':method :url :status :response-time'))
	app.locals.pretty = true
	mongoose.set('debug',true)
}

require('./config/routes')(app)


app.use(express.static(path.join(__dirname,'public')))     //__dirname当前目录     //express.stati静态资源获取

app.locals.moment = require('moment')
app.listen(port)

console.log('imooc started on port' + port);

