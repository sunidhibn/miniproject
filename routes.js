var note = require('./handlers/notes.js')

function route(app,text){
	
	app.get('/', function(req,res){
			return res.render('home.html')
		})
	
}
exports.routes = route