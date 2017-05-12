var auth = require("./handlers/auth.js")
var room = require("./handlers/room.js")
var events = require("./handlers/events.js")
var incharge = require("./handlers/incharge.js")
var home = require("./handlers/home.js")
var office = require("./handlers/office.js")
var dept = require("./handlers/dept.js")
var user = require("./handlers/user.js")


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
			}
			else{
				req.session.user = user
				res.redirect('/')
			}
		}); 
	})
	

	app.get('/', Auth, home.getHomepage)
	app.post('/', Auth, home.bookRoom)

    app.get('/events/:roomId', Auth, events.getEvents)
	

	app.get('/showbooking',Auth, home.getBooklist)
	app.post('/showbooking',Auth, home.deleteBooking)

	

	app.get('/office', Auth, function(req,res){
			return res.render('office.html')
		})
	app.post('/office',Auth, office.addOffice)



	app.get('/dept', Auth, dept.getOfficelist)
	app.get('/dept/:offId',Auth,dept.getDeptlist)
	app.post('/dept', Auth, dept.addDept)


	
	app.get('/rooms', Auth,room.getRoomslist)  

	app.get('/rooms/new', Auth, room.getOfficelist)
	app.get('/incharge/:iId',Auth,incharge.getIncharge)	
	app.post('/rooms/new',Auth,room.addRoom)

	app.post('/incharge',Auth,incharge.addInch)


	app.get('/incharge',Auth,function(req,res){
		  return res.render('incharge.html')
 
	})


 	app.get('/users', Auth, user.getUserlist)
    app.post('/users',Auth, user.addUser)
    

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