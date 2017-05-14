var express= require('express')
var bodyParser = require('body-parser')
var path= require('path')
var session= require('express-session');
var nunjucks= require( 'nunjucks' )
var config = require('./config.js')
var routes= require('./routes.js')
var models= require('./models.js')



var app=express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()); 



nunjucks.configure( path.join(__dirname, 'templates'), {
    autoescape: true,
    express: app
} ) ;

models.createTable();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

routes.routes(app)

app.listen(process.env.PORT || 5000)