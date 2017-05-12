var config= require('../config.js')
var squel = require('squel')
var mysql= require("mysql")
var bodyParser = require('body-parser')
var connection= mysql.createConnection(config.mysql)

var getOfficelist=function(req,res){

	var query= squel.select()
		        .from("office as o") 
				.field("o.id,o.name")
				.toString()


	connection.query(query,function(err,off){

			if (err)
				console.log(err)
			else 
				res.render('room.html',{off:off})
	})

}

var addRoom=function(req,res){

		
		
			console.log(req.body.name)


			for(i=0; i<req.body.length;i++){
			console.log((req.body)[i])
			

		}

		//console.log((req.body)[i].name)



		// for(i=0; i<req.body.length;i++){
		// 	var query = squel.insert()
		//         .into("room")
		//         .set("roomname", rname)
		//         .set("deptid",(req.body)[i])
		//         .set("inchargeid",inchid)
		// 		.toString()


		// 		connection.query(query,function(err,msg){

		// 	if (err)
		// 		console.log(err)
		// 	else 
		// 		{}
		// })

		//}

		

	

}


exports.getOfficelist=getOfficelist
exports.addRoom=addRoom