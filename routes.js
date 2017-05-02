var auth = require("./handlers/auth.js")
//var book = require("./handlers/book.js")
var events = require("./handlers/events.js")
var home = require("./handlers/home.js")
var office = require("./handlers/office.js")
var dept = require("./handlers/dept.js")


function route(app){

	
	var Auth = function(req, res, next){
		if(req.session.user)
			next();
		else
			res.redirect('/login')
	}

	app.get('/login', function(req,res){
			return res.render('login.html')
		})

	app.post('/login', function(req, res){
		var email = req.body.email
		var pass = req.body.password
		auth.login(email, pass, function(error, user){
			if(typeof user === 'undefined'){
				res.render('login.html', { error: true})
			}else{
				req.session.user = user

				res.redirect('/')
			}
		}); 
	})
	

	app.get('/', Auth, home.getHomepage)
	app.post('/', Auth, home.bookRoom)





    app.get('/events/:roomId', Auth, events.getEvents)
	// app.post('/',function(req,res){
	// 	var eventname=req.body.eventname
	// 	var startdate=req.body.stdate;
	// 	var enddate=req.body.enddate
	// 	var room=req.body.roomselect

	// 	book.bookroom(eventname,startdate,enddate,room, function(err,){

	// 		if(err) console.log(err);

	// 		else res.redirect('/')


	// 	})

	// })


	app.get('/office', Auth, function(req,res){
			return res.render('office.html')
		})

	app.post('/office',Auth, office.addOffice)



	app.get('/dept', Auth, dept.getOfficelist)
	app.post('/dept', Auth, dept.addDept)


	


	app.get('/rooms', Auth,  function(req,res){
			return res.render('roomlist.html')
		})

	app.get('/rooms/new', Auth,  function(req,res){
			return res.render('room.html')
		})
   
    app.get('/users', Auth,  function(req,res){
			return res.render('userlist.html')
		})

    app.get('/users/new', Auth,  function(req,res){
			return res.render('user.html')
		})

    app.get('/profile', Auth,  function(req,res){
			return res.render('profile.html')
		})

    app.get('/logout', Auth,  function(req,res){
			req.session.destroy(function(err) {
  				if (err){
  					console.log(err)
  				}
  				else{
  					res.redirect('/')
  				}
			})

		})

}
exports.routes = route