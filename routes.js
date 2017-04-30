var note = require('./handlers/notes.js')

function route(app,text){
	
	app.get('/', function(req,res){

		sess=req.session;
		
				return res.render('home.html')

		})
	

	app.post('/login', function(req, res) {
		sess=req.session;
		sess.user=req.body.username
		var username= req.body.username
		var pass= req.body.password
		var msg="please enter username and password";

		if(sess.user){

		note.addNote(username,pass,function(err,rows){
			if(err) 	console.log(err)
			
			if(rows.length>0) 
			{
			
				note.getinfo(username,function(err,info)
				{
					
					if(err) console.log(err)
					else	
						{return res.render('login.html',{info: info})}
				})



			}
			else {
				msg="Not registerd user"
				res.render('home.html',{msg:msg})


			}
			})

		}

		else return res.render('home.html',{msg:msg})
	})



	app.get('/logout', function(req,res){

		req.session.destroy(function(err){
		if(err){
			console.log(err);
		}
		else
		{
			res.redirect('/');
		}
		});
		
	})




	

}
exports.routes = route