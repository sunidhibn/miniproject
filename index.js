var express= require('express')
var bodyParser = require('body-parser')
var path=require('path')
var session		=	require('express-session');
var dialog = require('dialog')
var nunjucks = require( 'nunjucks' )
var routes = require('./routes.js')


var app= express()

nunjucks.configure( path.join(__dirname, 'templates'), {
    autoescape: true,
    express: app
} ) ;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('/static', express.static(path.join(__dirname, 'public')))

routes.routes(app)

app.listen(8000,function(){
	console.log("server listening on 8000")
});